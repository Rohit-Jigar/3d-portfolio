import { useState } from 'react';
import { Network, Play, Terminal } from 'lucide-react';

export default function McpSection() {
  const [activeTool, setActiveTool] = useState<'database' | 'api' | 'validation'>('database');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const mcpTools = {
    database: {
      name: 'query_schema_registry',
      category: 'Database Resource',
      desc: 'Allows the AI model to inspect relational table constraints and types prior to generating SQL queries.',
      payload: {
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name: 'query_schema_registry',
          arguments: { target_schema: 'assets_inventory', include_foreign_keys: true }
        }
      },
      response: {
        jsonrpc: '2.0',
        result: {
          content: [
            {
              type: 'text',
              text: 'Found 14 columns in table assets_inventory. Primary key: asset_id (UUID). RBAC role: admin/support.'
            }
          ],
          isError: false
        }
      }
    },
    api: {
      name: 'fetch_service_health',
      category: 'API Gateway Tool',
      desc: 'Inspects upstream microservice health status and latency before executing write workflows.',
      payload: {
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name: 'fetch_service_health',
          arguments: { service_endpoint: 'https://api.internal/v1/health' }
        }
      },
      response: {
        jsonrpc: '2.0',
        result: {
          content: [
            {
              type: 'text',
              text: 'Status: 200 OK. Latency: 42ms. Active connection pool: 85% available.'
            }
          ],
          isError: false
        }
      }
    },
    validation: {
      name: 'validate_migration_record',
      category: 'Data Validation Tool',
      desc: 'Validates record attributes against destination system acceptance rules before queueing ingestion.',
      payload: {
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
          name: 'validate_migration_record',
          arguments: { record_id: 'rec_9281a', non_null_check: true }
        }
      },
      response: {
        jsonrpc: '2.0',
        result: {
          content: [
            {
              type: 'text',
              text: 'Record rec_9281a: PASSED all 12 destination constraints. Zero null conflicts.'
            }
          ],
          isError: false
        }
      }
    }
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationResult(null);
    setTimeout(() => {
      setSimulationResult(mcpTools[activeTool].response);
      setIsSimulating(false);
    }, 450);
  };

  return (
    <section id="mcp" className="relative py-28 px-6 bg-[#030712] border-t border-slate-900/80 overflow-hidden">
      {/* Glow decorations */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 to-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>MODEL CONTEXT PROTOCOL (MCP)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Connecting AI to <span className="text-gradient-cyan">Real-World Tools</span>
          </h2>

          <p className="text-base text-gray-300 font-light leading-relaxed">
            The Model Context Protocol (MCP) provides a standardized, open specification allowing compatible AI models to safely discover tools, inspect real-time schemas, and interact with external systems through structured JSON-RPC interfaces.
          </p>
        </div>

        {/* Conceptual Architecture Flow Diagram */}
        <div className="rounded-3xl bg-slate-900/40 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl mb-12 shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold block">
                Standardized MCP Architecture Flow
              </span>
              <span className="text-xs text-gray-400">
                Conceptual diagram illustrating the decoupled client-server protocol boundary
              </span>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-[10px] font-mono text-gray-400 border border-slate-700">
              JSON-RPC 2.0 Spec
            </span>
          </div>

          {/* Flow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 block mb-1">01 / ORIGIN</span>
                <h4 className="text-sm font-bold text-white mb-1">AI Application</h4>
                <p className="text-xs text-gray-400 font-light leading-snug">
                  Autonomous agent or LLM generating intent to consult real-world context.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-gray-500">
                LLM Reasoning Context
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 block mb-1">02 / INTERMEDIARY</span>
                <h4 className="text-sm font-bold text-cyan-200 mb-1">MCP Client</h4>
                <p className="text-xs text-gray-400 font-light leading-snug">
                  Orchestrator managing protocol handshake, capabilities, and session authorization.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-cyan-400">
                Protocol Bridge
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-violet-500/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-violet-400 block mb-1">03 / GATEWAY</span>
                <h4 className="text-sm font-bold text-violet-200 mb-1">MCP Server</h4>
                <p className="text-xs text-gray-400 font-light leading-snug">
                  Exposes registered tools, resource templates, and prompt schemas safely.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-violet-400">
                Tool Definition & Auth
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-400 block mb-1">04 / DISPATCH</span>
                <h4 className="text-sm font-bold text-white mb-1">Tools & Prompts</h4>
                <p className="text-xs text-gray-400 font-light leading-snug">
                  Executes validated queries, reads file resources, or evaluates parameters.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-gray-500">
                Parameter Validation
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 block mb-1">05 / TARGET</span>
                <h4 className="text-sm font-bold text-white mb-1">External Systems</h4>
                <p className="text-xs text-gray-400 font-light leading-snug">
                  PostgreSQL, REST APIs, Git repositories, file systems, and internal services.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-emerald-400">
                Protected Data Source
              </div>
            </div>
          </div>
        </div>

        {/* Interactive JSON-RPC Tool Handshake Simulator */}
        <div className="rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold block">
                Interactive MCP Tool Handshake Simulator (Conceptual Simulation)
              </span>
              <p className="text-xs text-gray-400 font-light">
                Select an MCP tool to inspect the real JSON-RPC 2.0 payload sent across the wire.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {(['database', 'api', 'validation'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTool(key);
                    setSimulationResult(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeTool === key
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'bg-slate-900 text-gray-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {mcpTools[key].name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Request Payload */}
            <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-gray-400">
                <span className="text-[11px] text-cyan-400 font-semibold">
                  Client → Server (JSON-RPC 2.0 Request)
                </span>
                <span className="text-[10px] text-gray-500">Method: tools/call</span>
              </div>
              <pre className="text-gray-300 overflow-x-auto p-2 bg-black/40 rounded-lg">
                {JSON.stringify(mcpTools[activeTool].payload, null, 2)}
              </pre>
            </div>

            {/* Response Payload */}
            <div className="rounded-xl bg-slate-950/90 border border-slate-800 p-4 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-gray-400">
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Server → Client (JSON-RPC 2.0 Response)
                  </span>
                  <span className="text-[10px] text-gray-500">Result Context</span>
                </div>
                {simulationResult ? (
                  <pre className="text-emerald-300 overflow-x-auto p-2 bg-black/40 rounded-lg">
                    {JSON.stringify(simulationResult, null, 2)}
                  </pre>
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center text-gray-500 text-xs gap-2">
                    <Terminal className="w-6 h-6 text-gray-600" />
                    <span>Click "Execute Handshake" to dispatch simulated protocol request</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between">
                <span className="text-[10px] text-gray-500">
                  Safe simulation running locally in client sandbox
                </span>
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md shadow-cyan-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isSimulating ? 'Dispatching...' : 'Execute Handshake'}
                </button>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-gray-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>
              <strong>Note on MCP Implementation:</strong> This interactive console demonstrates standard MCP protocol mechanics conceptually. Implementations in practice strictly isolate server capabilities to prevent unintended external tool execution.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
