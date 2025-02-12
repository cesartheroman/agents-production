# 1. LLM and Agent Recap

# Large Language Models and Agents: Foundation Concepts

## The Nature of Large Language Models

Large Language Models (LLMs) represent one of the most significant breakthroughs in articial intelligence. At their core, these models are sophisticated pattern recognition systems trained on vast amounts of text data. When you interact w/an LLM, you're essentially engaging with a system that has learned to predict what words should come next given a particular context.

The magic of modern LLMs lies in their transformer architecture, which processes text by paying attention to relationships b/w different parts of the input. When you provide a prompt, the model processes your input token by token, using learned patterns to understand the context and generate responses by predicting the most likely next tokens. 

### Common Applications

The versatility of LLMs has led to their adoption across numerous fields. They excel at content generation and writing assistance, often helping writers break through creative blocks or refine their work. In software dev, they've become invaluable tools for code generation and debugging, often catching subtle errors that humans might miss. Their ability to understand and analyze text makes them powerful tools for research assistance and data analysis, while their language understanding capabilities enable sophisticated translation and summarization tasks.

### Critical Limitations

Working with LLMs requires understanding thier fundamental limitations. The knowledge cutoff date means they can't provide info about recent events, while their inability to learn from convos prevents them from improving through interaction. When it comes to reliability, the challenge of hallucination -- where models generate plausible-souding but false info -- remains a significant concern. 

Technical constraints also play a crucial role:

- Context window limits restrict the amount of text they can process at once.
- No persistent memory means starting fresh with each convo
- High computational costs can make scaling challenging
- Token limits affect the length and complexity of responses

##  The Evolution to AI Agents

AI agents build upon the foundation of LLMs by adding crucial capabilities that address many of these limitations. Think of an agent as a sophisticated system that uses an LLM as it's "brain" but enhances it w/memory, tool use, decision-making, abilities, and the capacity to take actions in the real world. 

### How Agents Transform LLM Capabilities

The process of how agents work reveals their transformative potential. When an agent receives input -- whether text, data, or sensor info -- it first processes this through its LLM component. But unlike a raw LLM, an agent can then decide on appropriate actions using predefined tools and capabilities. It might choose to search a db, call an API, or perform calculations. The agent stores relevant info for future use and can maintain context across multiple interactions. 

This enhanced functionality makes agents particularly valuable in real-world apps. Consider a customer service agent that not only understands customer queries but can also access order histories, update shipping info, and trigger refund processes. Or think about a research agent that can maintain context across multiple research sessions, compile findings, and generate comprehensive reports. 

### Production Challenges

The journey to production reveals several important challenges:

1. Reliability Issues remain a primary concern. Agents may choose wrong tools or get stuck in loops, requiring careful monitoring and fallback mechanisms. 
2. Integration with existing systems demands significant attention to:
    - Error handling and recovery
    - Security and access control
    - Performance optimization
    - Resource management
3. The operational environment bring its own set of considerations. Latency becomes more critical when chains of tools are involved. Cost management requires balancing capability with resource usage. And perhaps most importantly, maintaining effective human oversight requires careful system design.

### The Path Forward

The key to successful agent deployment lies in understanding both the capabilities and limitations of your system. While agents can significantly enhance what's possible with LLMs, they require careful design and monitoring. Success often comes from starting simple and gradually adding complexity as you understand how your agent perform in real-world conditions. 

The fundamental difference between agents and raw LLMs -- the ability to maintain state, use tools, and take actions -- makes them particularly valuable for production apps. However, this same power requires additional attention to evaluation, enhancement through techniques like RAG, and carefule management of human oversight.

# 2. Improving LLMs with Evals

# Building Robust Evaluation Systems for LLMs and Agents

## The Challenge of Evaluation

Evaluating language models and agents presents a unique challenge in machine learning. Unlike traditional ML systems where metrics like accuracy or F1 score tell a clear story, LLM performance is often subjective and multifaceted. How do you measure the "correctness" of a convo? What makes one response better than another? These questions lie at the heart of building effective evaluation systems.


## Understanding Evaluation Types

The evaluation landscapre can be divided into three main categories, each serving different purposes in your dev pipeline. 

### Automated Evaluations

Automated evaluations form the backbone of continuous testing. These are programmatic checks that run without human intervention, measuring specific aspects of your system's performance. Think of them as your first line of defense against regressions and quality issues. 

A well-designed automated evaluation sutie might check for:

Response quality metrics -- measure factors like coherence, relevance, and toxicity using reference models or specialized classifiers. For example, you might use a smaller LLM to grade the outputs of your production model, checking if responses actually answer the given questions. 

Task completion verification -- ensuring your agen can successfully complete specific workflows. If your agent is designed to extract info from emails and update a CRM, your eval suite should verify this happens correctly acrosss a variety of email formats and edge cases. 

Tool usage accuracy -- confirming that agents are using the right tools at the right time and interpreting their outputs correctly. This is particularly crucial for preventing costly mistakes in production. 

## The Art of Dataset Creation

Perhaps the most critical aspect of evaluation is building high-quality test datasets. This is where theory meets practice, and where many evluation systems succeed or fail. 

Start with your actual use cases. Examine real user interactions, support tickets, or production logs to understand what your system actually needs to handle. Pay special attention to edge cases and failure modes -- these often provide the most valuable test cases. 

When building your dateset, consider thees key principles:

Coverage -- Your test cases should span the full range of expected functionality. This means including both common and rare scenarios, different user types, and varying lecels of complexity.

Diversity -- Include variations in language, tone, and format. If your users might phrase the same request in multiple ways, your test cases should reflect this diversity. 

Evolution -- Your test suite should grow with your system. When you discover new edge cases of failure modes in production, add them to your evaluation suite to prevent regression.

## Measuring What Matters

The most challenging aspect of LLM evaluation is often deciding what to measure. While metrics are essential, choosing the wrong metrics can lead you astray. Consider a customer service agent -- measuring just one response time might incentivize short, unhelpful answers, while focusing solely on user satisfaction might lead to overly verbose responses that slow down service. 

Instead, develop a balanced scorecard approach.

Task Success Rate forms your baseline -- did the agent actually accomplish what was asked? This might involve checking if the right info was retrieved, the correct tools were used, or the appropriate actions were taken. 

Quality Metrics help assess how well the task was performed. This could include:

- Response relevance to the query
- Adherence to specified formats or guidelines
- Appropriate tone and style
- Correct use of context and memory

Safety and Reliability checks ensure your system operates within acceptable bounds:

- Detection of potential harmful or inappropriate content
- Verification of factual accruacy where possible
- Monitoriing of resource usage and response times
- Checking for hallucinations of false assertions

## Practical Implementation Strategies

Start simple and iterate. Begin with basic automated checks that verify core functionality, then gradually add more sophisticated evaluation layers. A practical approach might look like this:

1. Implement basic unit tests for tool interactions and core functionality. 
2. Add automated checks for response quality and task completion
3. Build reference-based evaluations for areas where you have clear right/wrong answers
4. Develop more nuanced metrics for subjective aspects of performance
5. Incorporate periodic human review for aspects that resist automation

Create a continuous evaluation pipeline where new code or model changes must pass your eval suite before deployment. This catches potential issues early and maintains quality standards. 

## The Role of Human Feedback

While automation is crucial for scale, human feedback remains invaluable. Set up processes to regularly sample and review system outputs. This serves multiple purposes:

- Validates your automated metrics
- Catches issues your automated systems miss
- Provides training data for improving your evaluation models
- Helps identify new edge cases and failure modes

Consider implementing a simple feedback system where reviewers can flag responses as good or problematic, with space for detailed notes. This creates a valuable feedback loop for continuous improvement. 

Remember that evaluation is not a one-time effort but an ongoing process. As your system evolves and your users' need change, your evaluation criteria and methods should adapt accordingly. The goal is not perfection but continuous improvement in the aspects that matter most to your users and your business objectives. 

### Examples:

```typescript
// ./evals/scorers.ts
import type { Scorer } from 'autoevals'

export const ToolCallMatch: Scorer<any, {}> = async ({
    input,
    output,
    expected,
}) => {
    const score = 
        output.role === 'assistant' &&
        Array.isArray(output.tool_calls) &&
        output.tool_calls.length === 1 &&
        output.tool_calls[0].function?.name ===
            expected.tool_calls[0].function?.name
            ? 1
            : 0

    return {
        name: 'ToolCallMatch',
        score,
    }
}
```

```typescript
// ./evals/experiments/reddit.eval.ts
import { runEval } from '../evalTools'
import { runLLM } from '../../src/llm'
import { ToolCallMatch } from '../scorers'
import { redditToolDefinition } from '../../src/tools/reddit'

const createToolCallMessage = (toolName: string) => ({
    role: 'assistant',
    tool_calls: [
        {
            type: 'function',
            function: { name: toolName },
        }
    ]
})

runEval('reddi', {
    task: (input) => 
        runLLM({
            messages: [{role: 'user', content: input}],
            tools: [redditToolDefinition],
        }),
    data: [
        {
            input: 'tell me something cool from reddit',
            expected: [redditToolDefinition],
        }
    ],
    scorers: [ToolCallMatch]
})
```

```typescript
// ./evals/experiments/dadJoke.eval.ts
import { runEval } from '../evalTools'
import { runLLM } from '../../src/llm'
import { ToolCallMatch } from '../scorers'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'

const createToolCallMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: { name: toolName },
    },
  ],
})

runEval('dadJoke', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [dadJokeToolDefinition],
    }),
  data: [
    {
      input: 'tell me a dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
```

```typescript
// ./evals/experiments/generateImage.eval.ts
import { runEval } from '../evalTools'
import { runLLM } from '../../src/llm'
import { ToolCallMatch } from '../scorers'
import { generateImageToolDefinition } from '../../src/tools/generateImage'

const createToolCallMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: { name: toolName },
    },
  ],
})

runEval('generateImage', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [generateImageToolDefinition],
    }),
  data: [
    {
      input: 'can you generate an image of a sunset',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
```

```typescript
// ./evals/experiments/allTools.eval.ts
import { runEval } from '../evalTools'
import { runLLM } from '../../src/llm'
import { ToolCallMatch } from '../scorers'
import { redditToolDefinition } from '../../src/tools/reddit'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
import { dadJokeToolDefinition } from '../../src/tools/dadJoke'
import { movieSearchToolDefinition } from '../../src/tools/movieSearch'

const createToolCallMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: { name: toolName },
    },
  ],
})

const allTools = [
  redditToolDefinition,
  generateImageToolDefinition,
  dadJokeToolDefinition,
  movieSearchToolDefinition,
]

runEval('allTools', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: allTools,
    }),
  data: [
    {
      input: 'tell me something interesting from reddit',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: 'generate an image of a mountain landscape',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'tell me a dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    {
      input: 'what movies did Christopher Nolan direct?',
      expected: createToolCallMessage(movieSearchToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
```

# 3. RAG

# Understanding and Implementing RAG Systems

## What is Retrieval Augmented Generation?

Retrieval Augmented Generation, or RAG, represents a fundamental shift in how we approah LLM knowledge enhancement. Rather than solely relying on an LLM's built-in knowledge, RAG dynamically injects relevant info into the conversation by retrieving it from an external knowledge base. Think of it as giving your LLM access to a personalized library that it can reference during conversations.

## The RAG Pipeline

Understanding RAG requires breaking down is core components and how they work together:

### Document Processing

The journey begins with your documents. These could be anything from technical manuals and research papers to customer support tickets and internal wikis. The processing pipeline typically involves:

Text Extraction -- Converting various file formats into plain text while preserving important structural info. This seemingly simple step can become complex when dealing with PDFs, images with text, or documents with complex formatting.

Chunking -- Breaking down documents into smaller, manageable pieces. This isn't as straightforward as it might seem. Chunk too small, and you lose context. Chunk too large, and you might dilute the relevance of your retrievals. The art lies in maintaining semantic coherence while optimizing for retrieval. (Scott: A naive v1 implementation would be to chunk by 100 tokens, but each following chunk will overlap with the previous chunk's last 20 tokens to try make the LLM have a better chance of retaining context.)

### Embedding Generation

Once you have your chunks, you need to convert them into a format that enables efficient similarity search. This is where embeddings come in -- dense vector representations of your text that capture semantic meaning. (Scott: Embeddings are the numerical representation of a piece of text)

The choice of embedding model is crucial. While OpenAI's text-embedding-ada-002 is popular, you might opt for domain-specific models or newer alternatives like BGE or INSTRUCTOR. Each comes with its own tradeoffs in terms of accuracy, speed, and cost.

### Storage and Indexing

Your embeddings need to be stored in a way that enables fast retrieval. Vector databases like Pinecone, Weaviate, or FAISS become essential here. The choice of database and index type impacts both retrieval speed and accuracy.

Consider factors like:

- Update frequency of your knowledge base
- Required query latency
- Scale of your data
- Cost considerations

### Retrieval Process

When a query comes in, RAG follows these steps:

1. Convert the query into an embedding using the same model used for documents
2. Search the vector database for similar chunks
3. Filter and rank the results
4. Format the retrieved context for injection into the prompt

The complexity lies in optimizing each step. How many chunks should you retrieve? How should you handle context length limitations? How do you ensure diversity in your retrievals while maintaining relevance?

## Beyond Question Answering

While RAG is commonly associated with question answering, its applications extend much further:

### Document Creation

RAG can help generate documents by pullling in relevant information from your knowledge base. This ensures consistency with existing documentation and reduces the chance of hallucination.

### Fact-Checking and Verification

By comparing LLM outputs against retrieved information, RAG systems can verify factual accuracy and identify potential hallucinations.

### Knowledge Synthesis

RAG excels at combining information from multiple sources to create comprehensive responses, making it valuable for research and analysis tasks. 

### Personalization

By incorporating user-specific or organization-specific knowledge, RAG enables more contextually aware and personalized interactions.

## The Challenges of RAG

Building effective RAG systems comes with several significant challenges:

### Relevance vs. Diversity

Finding the right balance between retrieving highly similar chunks and maintaining enough diversity for comprehensive answers is an ongoing challenge. Too much focus on similarity can lead to redundant information, while too much diversity might introduce irrelevant context.

### Context Window Management

LLMs have limited context windows, so you need to be strategic about how much retrieved information you include. This often requries sophisticated chunk selection and prompt engineering.

### Hallucination Control

While RAG can reduce hallucinations, it doesn't eliminate it entirely. LLMs might still blend retrieved information with their pretrained knowledge in unexpected ways.

### Performance Optimization

Each component of the RAG pipeline presents optimzation opportunities:

- Chunking strategies (size, overlap, metadata)
- Embedding model selection and fine-tuning
- Retrieval algorithsm and ranking methods
- Prompt engineering for context integration

## Best Practices for RAG Implementation

Start with Clear Objectives -- Understand what you're trying to achieve with RAG. Different use cases might require different architectural choices. 

Invest in Data Quality -- The quality of your RAG system is fundamentally limited by the quality of your knowledge base. Spend time cleaning and organizing your documents.

Monitor and Iterate -- Track key metrics like retrieval relevance and response accuracy. Use this data to continously refine your system.

Consider Hybrid Approaches -- Sometimes combining RAG with other techniques liek few-shot learning or tool use can provide better results than RAG alone. 

The future of RAG lies in more sophisticated retrieval mechanisms, better integration with other AI techniques, and more efficient ways of managing and updating knowledge bases. As models and tools continue to evolve, the possibilities for enhancing LLM capabilities through RAG will only grow.
