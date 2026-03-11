import React, { useState } from 'react';
import './global.css'; // Essential for Tailwind styling
import { generateProspectBrief } from './src/lib/generateDossier';
import { DossierOutput, ProspectInput } from './src/types/dossier';

export default function App() {
  const [dossier, setDossier] = useState<DossierOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    prospectName: '',
    occupation: '',
    location: '',
    spouseName: '',
    education: '',
    knownFamily: '',
    knownAssets: '',
    officerNotes: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Clears all text boxes on the form
  const clearFields = () => {
    setFormData({
      prospectName: '',
      occupation: '',
      location: '',
      spouseName: '',
      education: '',
      knownFamily: '',
      knownAssets: '',
      officerNotes: ''
    });
    setError(null);
  };

  // Resets the output view to start a new query without erasing typed data
  const resetForm = () => {
    setDossier(null);
  };

  const handleGenerate = async (e: any) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);

    const mappedInput: ProspectInput = {
      prospectName: formData.prospectName,
      location: formData.location,
      spouseName: formData.spouseName,
      assignedOfficer: "Unassigned",
      education: formData.education,
      knownFamily: formData.knownFamily,
      knownAssets: formData.knownAssets, 
      notes: formData.officerNotes,
    };

    try {
      const result = await generateProspectBrief(mappedInput);
      setDossier(result);
    } catch (err) {
      setError("Intelligence gathering failed. Please check your API key and connection.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-y-auto pb-20 print:h-auto print:overflow-visible print:bg-white print:pb-0">
      <div className="max-w-5xl mx-auto px-4 py-8 print:max-w-none print:w-full print:p-0 print:m-0">
        
        {/* Header - Hidden during print */}
        {!dossier && (
          <div className="mb-8 border-b border-slate-200 pb-4 print:hidden">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">ProspectDossier AI</h1>
            <p className="text-sm text-slate-500 mt-1 uppercase tracking-wider font-semibold">
              Confidential Intelligence Briefing Engine
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700 print:hidden">
            {error}
          </div>
        )}

        {/* View 1: The New Intake Form */}
        {!dossier && !isGenerating && (
          <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-slate-200 print:hidden">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Target Initialization</h2>
            <form onSubmit={handleGenerate} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Prospect Name *</label>
                  <input type="text" name="prospectName" required value={formData.prospectName} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 outline-none" placeholder="e.g., Bill Gates" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Occupation / Title</label>
                  <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 outline-none" placeholder="e.g., Philanthropist" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Target Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 outline-none" placeholder="e.g., Seattle, WA" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Education / College</label>
                  <input type="text" name="education" value={formData.education} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 outline-none" placeholder="e.g., Harvard University" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Spouse / Partner Name</label>
                  <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Known Family</label>
                  <input type="text" name="knownFamily" value={formData.knownFamily} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Known Assets & Wealth Indicators</label>
                <textarea name="knownAssets" value={formData.knownAssets} onChange={handleChange} rows={2} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 outline-none" placeholder="e.g., Real estate holdings, business ownership..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Officer Notes / Context</label>
                <textarea name="officerNotes" value={formData.officerNotes} onChange={handleChange} rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded focus:ring-2 focus:ring-blue-700 outline-none" placeholder="e.g., Interested in youth arts, needs capacity verification..."></textarea>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end space-x-4">
                <button type="button" onClick={clearFields} className="px-6 py-3 border border-slate-300 text-slate-700 font-bold rounded hover:bg-slate-50 transition-colors">
                  Clear Fields
                </button>
                <button type="submit" className="px-6 py-3 bg-blue-700 text-white font-bold rounded shadow hover:bg-blue-800 transition-colors">
                  Generate Intelligence Brief
                </button>
              </div>
            </form>
          </div>
        )}

        {/* View 2: Processing State */}
        {isGenerating && (
          <div className="py-32 flex flex-col items-center justify-center print:hidden">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
            <p className="mt-6 text-slate-600 font-medium text-lg animate-pulse">
              Synthesizing OSINT Data & Extracting Key Indicators...
            </p>
          </div>
        )}

        {/* View 3: The Dossier Output */}
        {dossier && !isGenerating && (
          <div className="bg-white p-8 md:p-12 rounded shadow-sm border border-slate-200 mt-8 print:p-0 print:m-0 print:shadow-none print:border-none">
            
            {/* Header */}
            <div className="border-b-2 border-slate-800 pb-4 mb-8 flex justify-between items-end">
              <div>
                <h2 className="text-4xl font-serif text-slate-900 mb-1">{formData.prospectName} Dossier</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prospect Research Intel Engine</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Verified Generation</p>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">Executive Summary</h3>
              <p className="text-sm text-slate-700 leading-relaxed">{dossier.executiveSummary}</p>
            </div>

            {/* Professional Profile */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">Professional Profile</h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li><span className="font-bold">Primary Role:</span> {dossier.professionalProfile.primaryRole}</li>
                <li>
                  <span className="font-bold">Career Trajectory:</span>
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    {dossier.professionalProfile.careerTrajectory.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Corporate Governance:</span>
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    {dossier.professionalProfile.corporateGovernance.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </li>
              </ul>
            </div>

            {/* Wealth & Financial Indicators */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">Wealth & Financial Indicators</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><span className="font-bold">Estimated Net Worth:</span> {dossier.wealthIndicators.estimatedNetWorth}</li>
                <li><span className="font-bold">Source of Wealth:</span> {dossier.wealthIndicators.sourceOfWealth}</li>
                <li>
                  <span className="font-bold">Asset Profile:</span>
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    {dossier.wealthIndicators.assetProfile.map((item, idx) => <li key={idx}>{item}</li>)}
                  </ul>
                </li>
                <li><span className="font-bold">Giving Capacity:</span> {dossier.wealthIndicators.givingCapacity}</li>
              </ul>
            </div>

            {/* Philanthropic Profile */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">Philanthropic Profile & Interests</h3>
              <p className="text-sm text-slate-700 mb-3">{dossier.philanthropicProfile.overview}</p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
                {dossier.philanthropicProfile.interestsAndGiving.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>

            {/* Biographical Details */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-3">Biographical Details</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><span className="font-bold">Spouse:</span> {dossier.biographicalDetails.spouse}</li>
                <li><span className="font-bold">Children:</span> {dossier.biographicalDetails.children}</li>
                <li>
                  <span className="font-bold">Affiliations:</span> {dossier.biographicalDetails.affiliations.join(", ")}
                </li>
                <li><span className="font-bold">Key Motivations:</span> {dossier.biographicalDetails.keyMotivations}</li>
              </ul>
            </div>

            {/* Audit Trail */}
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-md">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Discovery Audit Trail</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {dossier.sources.map((item, idx) => (
                  <div key={idx} className="flex items-center text-xs text-blue-600 bg-white border border-slate-200 p-2 rounded">
                    <span className="mr-2">📄</span> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end space-x-4 print:hidden">
              <button onClick={resetForm} className="px-6 py-2 border border-slate-300 hover:bg-slate-50 rounded text-slate-700 font-medium transition-colors">Start New Query</button>
              <button onClick={() => window.print()} className="px-6 py-2 bg-slate-900 text-white font-bold rounded shadow hover:bg-slate-800 transition-colors">Print Briefing</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}