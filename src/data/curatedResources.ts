export interface CuratedResource {
  title: string;
  url: string;
  type: "youtube" | "wikipedia" | "docs" | "github" | "paper";
  description: string;
  channelOrSource: string;
}

export function getCuratedResourcesForTopic(topicName: string): CuratedResource[] {
  const encTopic = encodeURIComponent(topicName);
  const encTopicAI = encodeURIComponent(`${topicName} machine learning tutorial`);
  const encWiki = encodeURIComponent(topicName.replace(/\s+/g, "_"));

  return [
    {
      title: `${topicName} - Deep Dive Video`,
      url: `https://www.youtube.com/results?search_query=${encTopicAI}`,
      type: "youtube",
      description: "Top-rated engineering tutorials & visual intuition breakdowns (3Blue1Brown, StatQuest, Karpathy).",
      channelOrSource: "YouTube Curated",
    },
    {
      title: `${topicName} - Formal Wikipedia & Theory`,
      url: `https://en.wikipedia.org/wiki/Special:Search?search=${encWiki}`,
      type: "wikipedia",
      description: "Mathematical definitions, historical algorithmic origins, and theoretical foundations.",
      channelOrSource: "Wikipedia",
    },
    {
      title: `${topicName} - Real Open Source Code & Implementation`,
      url: `https://github.com/search?q=${encTopic}+language%3APython&type=repositories`,
      type: "github",
      description: "Production GitHub repositories, minimal code implementations, and battle-tested notebooks.",
      channelOrSource: "GitHub Open Source",
    },
    {
      title: `${topicName} - ArXiv Research Papers`,
      url: `https://arxiv.org/search/?query=${encTopic}&searchtype=all`,
      type: "paper",
      description: "Original milestone research papers and frontier benchmarks.",
      channelOrSource: "ArXiv.org",
    },
  ];
}

