const fs = require('fs');
let file = fs.readFileSync('src/app/(admin-dashboard)/admin/ai-engines/components/TestVoiceAgentModal.tsx', 'utf8');

if(!file.includes('speechSynthesis')) {
  file = file.replace(
    'setChatHistory([{ role: \'agent\', text: greeting }]);',
    'setChatHistory([{ role: \'agent\', text: greeting }]);\n      speakText(greeting);'
  );
  
  file = file.replace(
    '// Simulate STT and LLM response',
    '// Simulate STT and LLM response\n    const responseText = "??? ????? ? ?? ????????, ????? ???? ????? ????? ????????? ????? ????? ????? ??";\n    speakText(responseText);'
  );

  file = file.replace(
    'const [knowledgeContext, setKnowledgeContext] = useState("");',
    'const [knowledgeContext, setKnowledgeContext] = useState("");\n\n  const speakText = (text: string) => {\n    if ("speechSynthesis" in window) {\n      const utterance = new SpeechSynthesisUtterance(text);\n      utterance.lang = "ne-NP";\n      window.speechSynthesis.speak(utterance);\n    }\n  };'
  );
  
  fs.writeFileSync('src/app/(admin-dashboard)/admin/ai-engines/components/TestVoiceAgentModal.tsx', file);
  console.log("Added speechSynthesis");
} else {
  console.log("Already has speechSynthesis");
}
