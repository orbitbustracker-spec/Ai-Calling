const fs = require('fs');

let f = 'src/app/(admin-dashboard)/admin/billing/BillingConfigClient.tsx';
let c = fs.readFileSync(f,'utf8');
c = c.replace('initialConfig: unknown', 'initialConfig: { customerPricePerMinute?: number } | null');
c = c.replace('catch (e: unknown) {', 'catch (e: unknown) { if (e instanceof Error)');
fs.writeFileSync(f,c);

f = 'src/app/(admin-dashboard)/admin/organizations/[id]/AdjustBalanceClient.tsx';
c = fs.readFileSync(f,'utf8');
c = c.replace('catch (e: unknown) {', 'catch (e: unknown) { if (e instanceof Error)');
fs.writeFileSync(f,c);

f = 'src/app/(admin-dashboard)/admin/packages/assign/AssignPackageClient.tsx';
c = fs.readFileSync(f,'utf8');
c = c.replace('organizations: unknown, packages: unknown', 'organizations: {id:string, name:string}[], packages: {id:string, name:string, minutes:number, calculatedPrice:number}[]');
c = c.replace('catch (e: unknown) {', 'catch (e: unknown) { if (e instanceof Error)');
fs.writeFileSync(f,c);

f = 'src/app/(admin-dashboard)/admin/packages/page.tsx';
c = fs.readFileSync(f,'utf8');
c = c.replace('../../../packages/CreatePackageForm', '../../../packages/CreatePackageForm');
fs.writeFileSync(f,c);

f = 'tests/rbac.test.ts';
c = fs.readFileSync(f,'utf8');
c = c.replace('init?: unknown', 'init?: {status?:number}');
fs.writeFileSync(f,c);

f = 'src/app/api/admin/organizations/[id]/adjust-balance/route.ts';
c = fs.readFileSync(f, 'utf8');
c = c.replace('context: { params: Promise<{ id: string }> }', 'context: any');
fs.writeFileSync(f,c);
