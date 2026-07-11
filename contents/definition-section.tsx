import React from 'react';

interface Definition {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
}

interface DefinitionSectionProps {
  definition: Definition;
  partOfSpeech : string; 
}

const partOfSpeechColors: Record<string, { bg: string; text: string }> = {
  exclamation: { bg: 'bg-primary bg-opacity-15', text: 'text-primary' },
  noun:        { bg: 'bg-tertiary bg-opacity-10', text: 'text-tertiary' },
  verb:        { bg: 'bg-secondary bg-opacity-10', text: 'text-secondary' },
  adjective:   { bg: 'bg-primary-container bg-opacity-10', text: 'text-primary-container' },
};

export function DefinitionSection({ definition , partOfSpeech }: DefinitionSectionProps ) {
  const colors = partOfSpeechColors[partOfSpeech] || {
    bg: 'bg-primary/10',
    text: 'text-primary',
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <span
          className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-200 ${colors.text} ${colors.bg} px-2 py-0.5 rounded hover:scale-105 ${
            partOfSpeech === 'Exclamation' ? 'shadow-sm' : ''
          }`}
        >
          {partOfSpeech}
        </span>
      </div>
      <p className="font-body-md text-body-md text-on-surface leading-relaxed">
        {definition.definition}
      </p>
      {definition.example && (
        <p className="text-label-sm italic text-on-surface-variant/70 pl-3 border-l-2 border-outline-variant/30">
          "{definition.example}"
        </p>
      )}
    </div>
  );
}
