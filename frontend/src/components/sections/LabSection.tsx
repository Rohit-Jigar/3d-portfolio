import { useState } from 'react';
import { FlaskConical, Play } from 'lucide-react';

export default function LabSection() {
  const [activeTab, setActiveTab] = useState<'migration' | 'rbac' | 'router'>('migration');

  // Simulation 1: Migration Cleanser Simulator
  const [rawRecordsCount, setRawRecordsCount] = useState(1000);
  const [cleansingRunning, setCleansingRunning] = useState(false);
  const [cleanseOutput, setCleanseOutput] = useState<{
    valid: number;
    quarantined: number;
    duplicates: number;
    status: string;
  } | null>(null);

  const runMigrationSim = () => {
    setCleansingRunning(true);
    setCleanseOutput(null);
    setTimeout(() => {
      const quarantined = Math.round(rawRecordsCount * 0.04);
      const duplicates = Math.round(rawRecordsCount * 0.02);
      const valid = rawRecordsCount - quarantined - duplicates;
      setCleanseOutput({
        valid,
        quarantined,
        duplicates,
        status: 'Processed batch successfully with zero memory leak'
      });
      setCleansingRunning(false);
    }, 500);
  };

  // Simulation 2: RBAC Matrix Check
  const [testUserRole, setTestUserRole] = useState<'Developer' | 'Support' | 'Admin'>('Developer');
  const [testAction, setTestAction] = useState<'view_asset' | 'assign_hardware' | 'trigger_flyway' | 'close_ticket'>('view_asset');

  const checkRbacPermission = (role: string, action: string) => {
    if (role === 'Admin') return { allowed: true, reason: 'Admin role carries global root authority' };
    if (role === 'Support') {
      if (action === 'trigger_flyway') return { allowed: false, reason: 'Restricted: Flyway migrations require Admin role' };
      return { allowed: true, reason: 'Authorized under Support Engineer operational scope' };
    }
    // Developer
    if (action === 'view_asset') return { allowed: true, reason: 'Authorized: Developers can view their assigned assets' };
    return { allowed: false, reason: 'Denied: Action requires Support Engineer or Admin privileges' };
  };

  const rbacResult = checkRbacPermission(testUserRole, testAction);

  return (
    <section id="lab" className="relative py-28 px-6 bg-[#030712] border-t border-slate-900/80">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE ENGINEERING LAB</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Interactive <span className="text-gradient-cyan">System Simulations</span>
          </h2>

          <p className="text-base text-gray-400 font-light">
            Explore live simulations of data cleansing workflows, RBAC authorization matrices, and dynamic model routing. All demonstrations are strictly isolated simulations.
          </p>

          <div className="mt-3 inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-400">
            ⚠ Clearly labeled simulations: Independent of private corporate networks or proprietary keys.
          </div>
        </div>

        {/* Lab Container */}
        <div className="rounded-3xl bg-slate-900/40 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* Simulation Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-slate-800">
            <button
              onClick={() => setActiveTab('migration')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'migration'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900 text-gray-400 hover:text-white border border-slate-800'
              }`}
            >
              1. Batch Data Cleansing Simulation
            </button>

            <button
              onClick={() => setActiveTab('rbac')}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'rbac'
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-500/30'
                  : 'bg-slate-900 text-gray-400 hover:text-white border border-slate-800'
              }`}
            >
              2. IMS RBAC Permission Matrix
            </button>
          </div>

          {/* SIMULATION 1: BATCH MIGRATION CLEANSING */}
          {activeTab === 'migration' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">
                    High-Volume Record Cleanser & Quarantine Simulator
                  </h4>
                  <p className="text-xs text-gray-400 font-light">
                    Simulates batch sanitization logic: filters null values, strips malicious characters, isolates duplicates.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={rawRecordsCount}
                    onChange={(e) => setRawRecordsCount(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-xs text-gray-200 border border-slate-800 focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value={1000}>1,000 Records Batch</option>
                    <option value={10000}>10,000 Records Batch</option>
                    <option value={50000}>50,000 Records Batch</option>
                  </select>

                  <button
                    onClick={runMigrationSim}
                    disabled={cleansingRunning}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {cleansingRunning ? 'Cleansing...' : 'Run Cleanser'}
                  </button>
                </div>
              </div>

              {/* Simulation Result Displays */}
              {cleanseOutput && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">
                      Validated For Server B
                    </span>
                    <span className="text-2xl font-mono font-bold text-white">
                      {cleanseOutput.valid.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 block mt-1">Ready for atomic insertion</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30">
                    <span className="text-[10px] font-mono text-amber-400 uppercase block mb-1">
                      Quarantined (Malformed)
                    </span>
                    <span className="text-2xl font-mono font-bold text-amber-300">
                      {cleanseOutput.quarantined.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 block mt-1">Routed to anomaly ledger</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30">
                    <span className="text-[10px] font-mono text-rose-400 uppercase block mb-1">
                      Suppressed Duplicates
                    </span>
                    <span className="text-2xl font-mono font-bold text-rose-300">
                      {cleanseOutput.duplicates.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400 block mt-1">Deduplicated before ingest</span>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 font-mono text-xs text-gray-400 flex items-center justify-between">
                <span>Status: {cleanseOutput ? cleanseOutput.status : 'Awaiting simulation run'}</span>
                <span className="text-cyan-400 font-semibold">Python ETL Pipeline Simulation</span>
              </div>
            </div>
          )}

          {/* SIMULATION 2: RBAC PERMISSION MATRIX */}
          {activeTab === 'rbac' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  IMS Role-Based Access Control Evaluation
                </h4>
                <p className="text-xs text-gray-400 font-light">
                  Tests authorization policies across Admin, Support Engineer, and Developer personas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <span className="text-xs font-mono text-gray-400 block">Select Role Persona:</span>
                  <div className="flex gap-2">
                    {(['Developer', 'Support', 'Admin'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setTestUserRole(r)}
                        className={`px-3 py-2 rounded-lg text-xs font-mono flex-1 cursor-pointer ${
                          testUserRole === r
                            ? 'bg-violet-600 text-white font-bold'
                            : 'bg-slate-900 text-gray-400 border border-slate-800'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs font-mono text-gray-400 block pt-2">Select Target Action:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'view_asset', label: 'View Assigned Hardware' },
                      { id: 'assign_hardware', label: 'Allocate Hardware' },
                      { id: 'close_ticket', label: 'Resolve IT Ticket' },
                      { id: 'trigger_flyway', label: 'Execute Flyway Migration' },
                    ].map((act) => (
                      <button
                        key={act.id}
                        onClick={() => setTestAction(act.id as any)}
                        className={`p-2.5 rounded-lg text-xs text-left cursor-pointer ${
                          testAction === act.id
                            ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                            : 'bg-slate-900/60 text-gray-400 border border-slate-800'
                        }`}
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Evaluation Result */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-500 block mb-2">
                      Access Control Verdict
                    </span>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`px-3 py-1 rounded-md text-xs font-mono font-bold uppercase ${
                          rbacResult.allowed
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                            : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                        }`}
                      >
                        {rbacResult.allowed ? '✓ Access Granted' : '✕ Access Denied'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-light mt-2">
                      {rbacResult.reason}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-gray-500">
                    Enforced by FastAPI RBAC Middleware
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
