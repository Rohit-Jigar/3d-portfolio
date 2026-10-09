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
    <section id="mcp" className="relative py-28 px-6 bg-black border-t border-zinc-900 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 mb-4">
            <Network className="w-3.5 h-3.5 text-white" />
            <span className="tracking-wider uppercase text-[11px]">MODEL CONTEXT PROTOCOL (MCP)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Connecting AI to <span className="text-gradient-silver">Real-World Tools</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            The Model Context Protocol (MCP) provides a standardized, open specification allowing compatible AI models to safely discover tools, inspect real-time schemas, and interact with external systems through structured JSON-RPC interfaces.
          </p>
        </div>

        {/* Conceptual Architecture Flow Diagram */}
        <div className="rounded-3xl bg-zinc-950 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl mb-12 shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-900">
            <div>
              <span className="text-xs font-mono uppercase text-white font-bold tracking-wider block">
                Standardized MCP Architecture Flow
              </span>
              <span className="text-xs text-zinc-500 font-light">
                Decoupled client-server protocol boundary
              </span>
            </div>
            <span className="px-2.5 py-1 rounded bg-zinc-900 text-[10px] font-mono text-zinc-400 border border-white/10">
              JSON-RPC 2.0 Spec
            </span>
          </div>

          {/* Flow Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-black border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block mb-1">01 / ORIGIN</span>
                <h4 className="text-sm font-bold text-white mb-1">AI Application</h4>
                <p className="text-xs text-zinc-400 font-light leading-snug">
                  Autonomous agent or LLM generating intent to consult real-world context.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-900 text-[10px] font-mono text-zinc-500">
                LLM Reasoning Context
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-black border border-white/20 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-white block mb-1">02 / BRIDGE</span>
                <h4 className="text-sm font-bold text-white mb-1">MCP Client</h4>
                <p className="text-xs text-zinc-400 font-light leading-snug">
                  Orchestrator managing protocol handshake, capabilities, and session authorization.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-900 text-[10px] font-mono text-zinc-300">
                Protocol Bridge
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-black border border-white/25 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-white block mb-1">03 / GATEWAY</span>
                <h4 className="text-sm font-bold text-white mb-1">MCP Server</h4>
                <p className="text-xs text-zinc-400 font-light leading-snug">
                  Exposes registered tools, resource templates, and prompt schemas safely.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-900 text-[10px] font-mono text-zinc-300">
                Tool Definition & Auth
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-black border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block mb-1">04 / DISPATCH</span>
                <h4 className="text-sm font-bold text-white mb-1">Tools & Prompts</h4>
                <p className="text-xs text-zinc-400 font-light leading-snug">
                  Executes validated queries, reads file resources, or evaluates parameters.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-900 text-[10px] font-mono text-zinc-500">
                Parameter Validation
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-xl bg-black border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block mb-1">05 / TARGET</span>
                <h4 className="text-sm font-bold text-white mb-1">External Systems</h4>
                <p className="text-xs text-zinc-400 font-light leading-snug">
                  PostgreSQL, REST APIs, Git repositories, file systems, and internal services.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-900 text-[10px] font-mono text-zinc-400">
                Protected Data Source
              </div>
            </div>
          </div>
        </div>

        {/* Interactive JSON-RPC Tool Handshake Simulator */}
        <div className="rounded-3xl bg-zinc-950 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-900">
            <div>
              <span className="text-xs font-mono uppercase text-white font-bold tracking-wider block">
                Interactive MCP Tool Handshake Simulator (Simulation)
              </span>
              <p className="text-xs text-zinc-400 font-light">
                Select an MCP tool to inspect the real JSON-RPC 2.0 payload sent across the wire.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-black p-1 rounded-xl border border-white/10">
              {(['database', 'api', 'validation'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveTool(key);
                    setSimulationResult(null);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    activeTool === key
                      ? 'bg-white text-black font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {mcpTools[key].name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
            {/* Request Payload */}
            <div className="rounded-xl bg-black border border-zinc-800 p-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-900 text-zinc-400">
                <span className="text-[11px] text-white font-semibold">
                  Client → Server (JSON-RPC 2.0 Request)
                </span>
                <span className="text-[10px] text-zinc-500">tools/call</span>
              </div>
              <pre className="text-zinc-300 overflow-x-auto p-2 bg-zinc-950 rounded-lg">
                {JSON.stringify(mcpTools[activeTool].payload, null, 2)}
              </pre>
            </div>

            {/* Response Payload */}
            <div className="rounded-xl bg-black border border-zinc-800 p-4 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-900 text-zinc-400">
                  <span className="text-[11px] text-white font-semibold">
                    Server → Client (JSON-RPC 2.0 Response)
                  </span>
                  <span className="text-[10px] text-zinc-500">Result Context</span>
                </div>
                {simulationResult ? (
                  <pre className="text-white overflow-x-auto p-2 bg-zinc-950 rounded-lg">
                    {JSON.stringify(simulationResult, null, 2)}
                  </pre>
                ) : (
                  <div className="h-32 flex flex-col items-center justify-center text-zinc-600 text-xs gap-2">
                    <Terminal className="w-6 h-6 text-zinc-700" />
                    <span>Click "Execute Handshake" to dispatch simulated protocol request</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-zinc-900 mt-3 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">
                  Safe simulation running locally in client sandbox
                </span>
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-white hover:bg-zinc-200 text-black flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isSimulating ? 'Dispatching...' : 'Execute Handshake'}
                </button>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-black border border-zinc-900 text-[11px] text-zinc-400 font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>
              <strong>Note on MCP Implementation:</strong> This interactive console demonstrates standard MCP protocol mechanics conceptually. Implementations in practice strictly isolate server capabilities to prevent unintended external tool execution.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
