import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const faqs = [
  {
    question: "I showed up, but where are my points?",
    answer: "Points are awarded based on event participation logs and peer recognition. If they're missing, check if the event was tracked properly—or bribe a teammate for some Kudos (just kidding… or are we?)."
  },
  {
    question: "What if people just give points to their friends?",
    answer: "Nice try, but Kudos has built-in limits and transparency, so recognition stays fair. Plus, real impact gets rewarded more than a coffee run for your buddy."
  },
  {
    question: "Do leaderboards mean we're competing against each other?",
    answer: "Nope! They're all about friendly motivation, not cutthroat rivalry. Plus, different metrics ensure everyone has a chance to shine."
  },
  {
    question: "Can I customize my Kudos experience?",
    answer: "Absolutely! Your company sets the rules, rewards, and events—so Kudos can be as competitive or collaborative as you like."
  },
  {
    question: "I have a million points. Where's my yacht?",
    answer: "While we admire your enthusiasm, points are redeemable for company-approved rewards—think cool perks, not private islands."
  },
  {
    question: "What if I don't care about points and rankings?",
    answer: "That's okay! Kudos is about appreciation first, rewards second. Even if you're not chasing points, your efforts still get recognized."
  },
  {
    question: "Can I game the system?",
    answer: "We love creativity, but Kudos tracks engagement patterns, so if you try to cheat, the system might just cheat you back."
  },
  {
    question: "Is this just another HR thing that no one uses?",
    answer: "Nope! Kudos is designed to be engaging, rewarding, and actually useful—not just another corporate tool collecting dust."
  }
];

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      <button
        className={`w-full px-6 py-5 flex items-center justify-between rounded-xl text-left transition-all duration-200 ${
          isOpen 
            ? 'bg-blue-50 shadow-sm' 
            : 'hover:bg-gray-50'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
            isOpen ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
          }`}>
            <HelpCircle className="w-4 h-4" />
          </div>
          <h3 className={`text-lg font-medium transition-colors duration-200 ${
            isOpen ? 'text-blue-700' : 'text-gray-900 group-hover:text-gray-600'
          }`}>
            {question}
          </h3>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-all duration-300 ${
            isOpen 
              ? 'rotate-180 text-blue-600' 
              : 'text-gray-400 group-hover:text-gray-500'
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="px-18 py-5 pl-[4.5rem] pr-6 text-gray-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const FAQList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="relative max-w-xl mx-auto mb-12">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for answers..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors duration-200"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-2 bg-white rounded-2xl shadow-sm border border-gray-100">
        {filteredFaqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};