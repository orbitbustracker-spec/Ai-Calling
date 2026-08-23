'use client';

import { useState } from 'react';
import { Building2, Database, Phone, Link2, FileText, Globe, Upload, FileSpreadsheet, Plus, X, Search } from 'lucide-react';
import { Button } from '@/components/Button';

export function AdminKnowledgeBaseClient({ organizations }: { organizations: any[] }) {
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [search, setSearch] = useState('');
  
  const selectedOrg = organizations.find(o => o.id === selectedOrgId);
  const filteredOrgs = organizations.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  // UI state for adding new KB
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [kbType, setKbType] = useState<'TEXT' | 'URL' | 'FILE'>('TEXT');
  const [kbTitle, setKbTitle] = useState('');
  const [kbContent, setKbContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddKB = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrg) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/knowledge-base', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: selectedOrg.id,
          name: kbTitle,
          content: kbType === 'URL' ? `[URL source] ${kbContent}` : kbContent,
        })
      });
      if (res.ok) {
        alert('Knowledge Base added successfully!');
        window.location.reload();
      } else {
        alert('Failed to add Knowledge Base');
      }
    } catch (e) {
      alert('Error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Link2 className="h-6 w-6 text-indigo-600" />
            Knowledge Base Management
          </h1>
          <p className="text-gray-500 mt-1">View and manage organization knowledge bases, balance, and SIP connections.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar - Organization List */}
        <div className="bg-white rounded-lg shadow border border-gray-200 flex flex-col h-[70vh]">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search Organizations..." 
                className="w-full pl-9 p-2 text-sm border border-gray-300 rounded-md"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredOrgs.map(org => (
              <button
                key={org.id}
                onClick={() => setSelectedOrgId(org.id)}
                className={`w-full text-left px-3 py-3 rounded-md flex items-center gap-3 transition-colors ${selectedOrgId === org.id ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}
              >
                <Building2 className={`h-5 w-5 ${selectedOrgId === org.id ? 'text-indigo-600' : 'text-gray-400'}`} />
                <div className="truncate">
                  <p className="font-medium text-sm truncate">{org.name}</p>
                  <p className="text-xs opacity-70 truncate">{org.knowledgeBases.length} KB files</p>
                </div>
              </button>
            ))}
            {filteredOrgs.length === 0 && <p className="text-sm text-gray-500 text-center p-4">No organizations found.</p>}
          </div>
        </div>

        {/* Right Content - Details */}
        <div className="md:col-span-3">
          {selectedOrg ? (
            <div className="space-y-6">
              {/* Top Overview Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg text-green-700"><Database className="h-5 w-5" /></div>
                    <h3 className="font-semibold text-gray-800">Credits & Balance</h3>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mt-3">{selectedOrg.organizationBalance?.remainingMinutes || 0} <span className="text-sm font-normal text-gray-500">mins</span></p>
                  <p className="text-xs text-gray-500 mt-1">Status: <span className={selectedOrg.isActive ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{selectedOrg.isActive ? 'Active' : 'Inactive'}</span></p>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-700"><Phone className="h-5 w-5" /></div>
                    <h3 className="font-semibold text-gray-800">SIP Connections</h3>
                  </div>
                  {selectedOrg.sips && selectedOrg.sips.length > 0 ? (
                    <div className="mt-3 space-y-2">
                      {selectedOrg.sips.map((sip: any) => (
                        <div key={sip.id} className="flex justify-between items-center text-sm border-b pb-1 last:border-0">
                          <span className="font-medium">{sip.phoneNumber}</span>
                          <span className="text-gray-500">{sip.provider?.name || 'Unknown'}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-3">No SIP numbers assigned.</p>
                  )}
                </div>
              </div>

              {/* Knowledge Base Section */}
              <div className="bg-white rounded-lg shadow border border-gray-200">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    Organization Knowledge Base
                  </h3>
                  <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-1 py-1.5 px-3 text-sm">
                    <Plus className="h-4 w-4" /> Add Data
                  </Button>
                </div>
                
                <div className="p-5">
                  {selectedOrg.knowledgeBases.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <Link2 className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">No Knowledge Base Entries</p>
                      <p className="text-sm text-gray-500 mt-1">Upload documents, add URLs, or paste text to train the AI for this organization.</p>
                      <Button className="mt-4" onClick={() => setIsAddModalOpen(true)}>Add First Entry</Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedOrg.knowledgeBases.map((kb: any) => {
                        // Guess icon based on name
                        let Icon = FileText;
                        let iconColor = "text-blue-500";
                        if (kb.name.toLowerCase().includes('.pdf')) { Icon = FileText; iconColor = "text-red-500"; }
                        if (kb.name.toLowerCase().includes('http') || kb.name.toLowerCase().includes('.com') || kb.name.toLowerCase().includes('.gov')) { Icon = Globe; iconColor = "text-purple-500"; }
                        if (kb.name.toLowerCase().includes('.xls') || kb.name.toLowerCase().includes('.csv')) { Icon = FileSpreadsheet; iconColor = "text-green-500"; }
                        
                        return (
                          <div key={kb.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow group flex gap-4">
                            <div className={`p-3 bg-gray-50 rounded-full h-12 w-12 flex items-center justify-center ${iconColor}`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate" title={kb.name}>{kb.name}</h4>
                              <p className="text-xs text-gray-500 mt-1 truncate">
                                Added {new Date(kb.createdAt).toLocaleDateString()}
                              </p>
                              <div className="mt-2 text-xs text-indigo-600 font-medium cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                View Content &rarr;
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-lg shadow border border-gray-200">
              <Building2 className="h-16 w-16 text-gray-200 mb-4" />
              <h2 className="text-xl font-bold text-gray-800">Select an Organization</h2>
              <p className="text-gray-500 mt-2">Choose an organization from the sidebar to view their SIP connections, remaining credits, and manage their Knowledge Base AI training data.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add KB Modal */}
      {isAddModalOpen && selectedOrg && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative">
            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <Plus className="h-5 w-5 text-indigo-600" />
              Add Knowledge to {selectedOrg.name}
            </h2>

            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
              <button onClick={() => setKbType('TEXT')} className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-colors ${kbType === 'TEXT' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}><FileText className="h-4 w-4" /> Raw Text</button>
              <button onClick={() => setKbType('URL')} className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-colors ${kbType === 'URL' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}><Globe className="h-4 w-4" /> Web Link</button>
              <button onClick={() => setKbType('FILE')} className={`flex-1 py-2 text-sm font-medium rounded-md flex justify-center items-center gap-2 transition-colors ${kbType === 'FILE' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}><Upload className="h-4 w-4" /> PDF/Word/Excel</button>
            </div>

            <form onSubmit={handleAddKB}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title / Name</label>
                  <input required type="text" className="w-full p-2.5 border border-gray-300 rounded-md" value={kbTitle} onChange={e => setKbTitle(e.target.value)} placeholder="e.g. Return Policy 2024" />
                </div>

                {kbType === 'TEXT' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
                    <textarea required rows={6} className="w-full p-2.5 border border-gray-300 rounded-md" value={kbContent} onChange={e => setKbContent(e.target.value)} placeholder="Paste any text you want the AI to know about..."></textarea>
                  </div>
                )}

                {kbType === 'URL' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website URL to Scrape</label>
                    <input required type="url" className="w-full p-2.5 border border-gray-300 rounded-md" value={kbContent} onChange={e => setKbContent(e.target.value)} placeholder="https://example.com/pricing" />
                    <p className="text-xs text-gray-500 mt-1">The AI will extract text from this page automatically.</p>
                  </div>
                )}

                {kbType === 'FILE' && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700">Click to browse or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">Supported formats: PDF, DOCX, XLSX, CSV, TXT</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Knowledge Base'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
