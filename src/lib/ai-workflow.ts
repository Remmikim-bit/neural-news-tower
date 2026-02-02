export interface ReportRequest {
    topic: string;
    sources: string[]; // URLs or Source IDs
}

export interface GeneratedReport {
    title: string;
    summary: string;
    neutralAnalysis: string; // Markdown content
    sources: { id: string; title: string; url: string }[];
    timestamp: string;
}

export const generateNeutralReportPrompt = (topic: string, sourceArticles: string[]): string => {
    return `
You are an AI News Intelligence Analyst committed to absolute neutrality.
Target Topic: "${topic}"

Source Material:
${sourceArticles.map((a, i) => `[Source ${i + 1}]: ${a}`).join('\n')}

**Mission:**
Synthesize a "Deep Dive Intelligence Report" that neutralizes political bias.

**Guidelines:**
1. **Dry Tone**: Use a formal, intelligence-briefing style. Avoid adjectives like "shocking", "bold", "controversial".
2. **Attribution**: Start sentences with "According to Source A...", "Source B reports...".
3. **Structure**: 
   - **Executive Summary**: 3 bullet points of undisputed facts.
   - **Diverging Narratives**: Contrast how Left vs. Right media framed the event.
   - **Chronology**: Timeline of confirmed events.
4. **Citation**: Append [Source X] at the end of every claim.
5. **No Hallucination**: Do not add facts not present in the sources.

**Output Format**: Markdown.
`;
};

// Mock function to simulate AI generation
export const mockGenerateReport = async (req: ReportRequest): Promise<GeneratedReport> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                title: `Intelligence Briefing: ${req.topic}`,
                summary: "Comprehensive analysis of conflicting narratives regarding recent events.",
                timestamp: new Date().toISOString(),
                sources: [
                    { id: '1', title: 'Conservative View', url: '#' },
                    { id: '2', title: 'Progressive View', url: '#' },
                    { id: '3', title: 'International View', url: '#' }
                ],
                neutralAnalysis: `
### Executive Summary
- The Senate Committee has approved the new AI framework by a 12-5 vote [Source 1].
- Technology stocks reacted with high volatility immediately following the announcement [Source 3].
- Environmental groups have issued a joint statement criticizing the lack of carbon enforcement [Source 2].

### Diverging Narratives
**Economic Impact**
Source 1 (Conservative) emphasizes the potential for "unshackled innovation" and job creation, citing a projected 5% GDP growth. Conversely, Source 2 (Progressive) warns of "corporate deregulation" leading to systemic labor displacements, highlighting a lack of worker protections in the bill.

**Environmental Concerns**
While Source 1 dismisses environmental concerns as "regulatory overreach," Source 2 argues that the bill fails to address the high energy consumption of large language models, calling it a "step backward" for climate goals.

### Chronology
- **09:00 AM**: Committee session began.
- **11:30 AM**: Final vote cast.
- **02:00 PM**: Tech sector market correction observed.
        `
            });
        }, 1500);
    });
};
