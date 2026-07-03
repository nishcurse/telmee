import React from 'react';

interface Definition {
  partOfSpeech: string;
  definition: string;
  example: string;
}

interface DefinitionSectionProps {
  definition: Definition;
}

const partOfSpeechColors: Record<string, { bg: string; text: string }> = {
  Exclamation: { bg: 'bg-primary/15', text: 'text-primary' },
  Noun: { bg: 'bg-tertiary/10', text: 'text-tertiary' },
  Verb: { bg: 'bg-secondary/10', text: 'text-secondary' },
  Adjective: { bg: 'bg-primary-container/10', text: 'text-primary-container' },
};

export function DefinitionSection({ definition }: DefinitionSectionProps) {
  const colors = partOfSpeechColors[definition.partOfSpeech] || {
    bg: 'bg-primary/10',
    text: 'text-primary',
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${colors.text} ${colors.bg} px-2 py-0.5 rounded hover:scale-105 ${
            definition.partOfSpeech === 'Exclamation' ? 'shadow-sm' : ''
          }`}
        >
          {definition.partOfSpeech}
        </span>
      </div>
      <p className="font-body-md text-body-md text-on-surface leading-relaxed">
        {definition.definition}
      </p>
      <p className="text-label-sm italic text-on-surface-variant/70 pl-3 border-l-2 border-outline-variant/30">
        "{definition.example}"
      </p>
    </div>
  );
}
