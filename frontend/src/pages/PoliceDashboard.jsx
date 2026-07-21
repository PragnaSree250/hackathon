import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Network, MapPin, ShieldAlert, Layers } from 'lucide-react';

const mockChartData = [
  { name: 'Digital Arrest', count: 48 },
  { name: 'Phishing', count: 32 },
  { name: 'Mule Accounts', count: 19 },
  { name: 'Fake Currency', count: 12 },
];

export default function PoliceDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center space-x-3 shadow-md">
          <Network className="w-8 h-8 text-indigo-400 bg-indigo-950/60 p-1.5 rounded-lg border border-indigo-500/20" />
          <div>
            <span className="text-xs text-slate-400 font-mono block">Active Networks</span>
            <span className="text-xl font-bold text-white">14 Rings</span>
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center space-x-3 shadow-md">
          <MapPin className="w-8 h-8 text-rose-400 bg-rose-950/60 p-1.5 rounded-lg border border-rose-500/20" />
          <div>
            <span className="text-xs text-slate-400 font-mono block">High Density Hotspots</span>
            <span className="text-xl font-bold text-white">6 Zones</span>
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center space-x-3 shadow-md">
          <ShieldAlert className="w-8 h-8 text-amber-400 bg-amber-950/60 p-1.5 rounded-lg border border-amber-500/20" />
          <div>
            <span className="text-xs text-slate-400 font-mono block">Pending Threat Reviews</span>
            <span className="text-xl font-bold text-white">89 Cases</span>
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center space-x-3 shadow-md">
          <Layers className="w-8 h-8 text-emerald-400 bg-emerald-950/60 p-1.5 rounded-lg border border-emerald-500/20" />
          <div>
            <span className="text-xs text-slate-400 font-mono block">Platform Accuracy</span>
            <span className="text-xl font-bold text-white">94.2%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-5 rounded-xl shadow-lg">
          <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider mb-4">Platform Vector Volumetrics</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', color: '#f1f5f9' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-5 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider mb-3">Threat Cluster Graph Simulation</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Sentinel groups incoming alerts into campaign clusters based on shared infrastructure indicators.
            </p>
            <div className="border border-slate-800 bg-slate-900 rounded-lg p-4 space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Detected Campaign Nexus:</span>
                <span className="text-rose-400 font-bold">CAMP-2026-88X</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Correlated Citizen Submissions:</span>
                <span className="text-white">14 Independent Reports</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Primary Vector Category:</span>
                <span className="text-amber-400">Cross-Jurisdiction Mule Accounts</span>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-lg text-xs text-indigo-300 leading-normal">
            <strong>System Action Log:</strong> Live telemetry parameters match across 3 distinct districts. Recommending priority dispatch updates to financial intelligence analytics.
          </div>
        </div>
      </div>
    </div>
  );
}