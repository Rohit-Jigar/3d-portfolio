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
    <section id="skills" className="relative py-28 px-6 bg-black border-t border-zinc-900 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 border border-white/10 text-xs font-mono text-zinc-300 mb-4">
            <Code2 className="w-3.5 h-3.5 text-white" />
            <span className="tracking-wider uppercase text-[11px]">CAPABILITY MATRIX</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Technical <span className="text-gradient-silver">Capabilities</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-light">
            Real engineering proficiencies organized by discipline. Grounded in actual system implementations without fabricated percentage meters.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              ALL ({SKILLS_DATA.length})
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-zinc-950/80 border border-white/10 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40 text-white placeholder:text-zinc-600 font-sans"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl backdrop-blur-xl bg-zinc-950/70 border transition-all duration-200 group hover:-translate-y-0.5 ${
                skill.isHighlight
                  ? 'border-white/20 hover:border-white/40 shadow-lg shadow-black/80'
                  : 'border-white/8 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-100 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300">
                  {skill.category}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {skill.roleContext}
              </p>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-xs text-zinc-500 font-mono">
            No matching technologies found for "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
}
