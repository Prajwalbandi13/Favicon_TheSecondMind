import React, { useState } from "react";
import axios from "axios";
import { useThemeStore } from '../store/theme';

interface IdeaSection {
    title: string;
    ideas: string[];
}

const InnovationLabPage: React.FC = () => {
    const { isDarkMode } = useThemeStore();
    const [topic, setTopic] = useState("");
    const [sections, setSections] = useState<IdeaSection[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateIdeas = async () => {
        if (!topic.trim()) {
            setError("Please enter a topic.");
            return;
        }
        setError("");
        setLoading(true);
        setSections([]);

        try {
            const response = await axios.post("http://localhost:5000/innovation/generate", { topic });
            setSections(response.data.sections || []);
        } catch (err) {
            setError("Failed to generate ideas. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
    const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';
    const inputBgColor = isDarkMode ? 'bg-gray-700' : 'bg-white';
    const inputTextColor = isDarkMode ? 'text-white' : 'text-gray-900';

    return (
        <div className={`flex min-h-screen items-center justify-center ${bgColor}`}>
            <div className={`p-6 w-full ${bgColor} shadow-lg rounded-lg`}>
                <div className="max-w-4xl mx-auto">
                    <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>Innovation Lab</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Enter research topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className={`w-full p-2 ${borderColor} rounded-md mb-4 ${inputBgColor} ${inputTextColor}`}
                            disabled={loading}
                        />
                        <button
                            onClick={handleGenerateIdeas}
                            className={`w-full ${isDarkMode ? 'bg-blue-700' : 'bg-blue-500'} text-white px-4 py-2 rounded-md transition ${
                                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                            }`}
                            disabled={loading}
                        >
                            {loading ? "Generating..." : "Generate Ideas"}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    {sections.length > 0 && (
                        <div className="mt-6">
                            <h3 className={`text-lg font-semibold ${textColor}`}>Generated Ideas:</h3>
                            {sections.map((section, index) => (
                                <div key={index} className={`mt-4 p-4 border rounded-md shadow-sm ${bgColor} ${borderColor}`}>
                                    <h4 className={`text-xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>{section.title}</h4>
                                    <ul className="list-disc pl-5 mt-2">
                                        {section.ideas.map((idea, idx) => (
                                            <li key={idx} className={`text-gray-700 ${textColor}`}>{idea}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InnovationLabPage;