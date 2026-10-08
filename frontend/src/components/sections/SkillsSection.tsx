import { useState, useMemo } from 'react';
import { SKILL_CATEGORIES, SKILLS_DATA } from '../../data/skillsData';
import type { SkillCategory } from '../../types';
import { Code2, Search } from 'lucide-react';

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.roleContext.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="relative py-28 px-6 bg-[#030712] border-t border-slate-900/80 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
            <Code2 className="w-3.5 h-3.5" />
            <span>CAPABILITY MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Technical <span className="text-gradient-cyan">Capabilities</span>
          </h2>

          <p className="text-base text-gray-400">
            Real engineering proficiencies organized by discipline. Grounded in actual system implementations without fabricated percentage meters.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900/80 text-gray-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              All Skills ({SKILLS_DATA.length})
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/30'
                    : 'bg-slate-900/80 text-gray-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-900/70 border border-slate-800 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 text-gray-200 placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl backdrop-blur-md bg-slate-900/50 border transition-all duration-200 hover:-translate-y-0.5 group ${
                skill.isHighlight
                  ? 'border-cyan-500/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-950/20'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-bold text-gray-100 group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    skill.category === 'AI & Integration'
                      ? 'bg-violet-950/60 text-violet-300 border border-violet-500/30'
                      : skill.category === 'Backend'
                      ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                      : skill.category === 'Database & Data'
                      ? 'bg-blue-950/60 text-blue-300 border border-blue-500/30'
                      : 'bg-slate-800/60 text-gray-300 border border-slate-700'
                  }`}
                >
                  {skill.category}
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {skill.roleContext}
              </p>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-500">
            No matching technologies found for "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
}
