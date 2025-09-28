import { Button, Divider } from '@/components';
import type { CSSProperties } from 'react';

export const meta = {
  title: 'Experiments',
  description: 'Here we try stuff!',
};

const containerStyle = {
  '--border-radius': '1.5rem',
  '--color-one': 'rgba(14, 165, 233, 0.8)',
  '--color-two': 'rgba(251, 191, 36, 0.8)',
  '--size': 200,
  '--duration': 12,
  '--anchor': 90,
  '--border-width': 1.5,
  '--delay': '-11s',
  '--color-from': 'var(--color-one)',
  '--color-to': 'var(--color-two)',
} as CSSProperties;

const ButtonVars = {
  '--border-radius': '1.5rem',
  '--color-one': 'rgba(14, 165, 233, 0.8)',
  '--color-two': 'rgba(251, 191, 36, 0.8)',
  '--size': 64,
  '--duration': 12,
  '--anchor': 90,
  '--border-width': 1.5,
  '--delay': '-11s',
  '--color-from': 'var(--color-one)',
  '--color-to': 'var(--color-two)',
} as CSSProperties;

const ExperimentsPage = () => {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-24">
        <header>
          <h2 className="text-2xl font-semibold">Let&apos;s play</h2>
        </header>
        <div
          className="relative w-124 h-48 inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-move after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_var(--border-radius))]"
          style={containerStyle}
        ></div>

        <div className="relative w-64 h-40 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d4d3a] via-[#0f6d4c] to-[#089060] animate-hue"></div>

          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>

          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
        </div>

        <Button
          style={ButtonVars}
          variant="custom"
          className="h-12 w-24 z-20 rounded-[calc(var(--border-radius))]"
        >
          <span>Clickz</span>
          <div className="absolute [border:calc(var(--border-width)*1px)_solid_transparent] z-10 h-full w-full ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-move after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_var(--border-radius))]"></div>
        </Button>

        <BattleNetLoader />

        <BattleNetLoaderFlat />
      </section>
    </div>
  );
};

function BattleNetLoader() {
  return (
    <div className="relative w-[50px] h-[50px]">
      {/* Three rotating arcs */}
      <div className="absolute inset-0 [transform:rotate(0deg)]">
        <div
          className="absolute inset-0
                          after:content-[''] after:absolute after:w-[50px] after:h-[50px] after:rounded-full
                          after:border-l-[5px] after:border-l-[#00b6ff]
                          // after:[animation:ro2_1.75s_linear_infinite]"
        ></div>
      </div>

      <div className="absolute inset-0 [transform:rotate(120deg)]">
        <div
          className="absolute inset-0
                          after:content-[''] after:absolute after:w-[50px] after:h-[50px] after:rounded-full
                          after:border-l-[5px] after:border-l-[#00b6ff]
                          after:[animation:ro2_1.75s_linear_infinite]"
        ></div>
      </div>

      <div className="absolute inset-0 [transform:rotate(240deg)]">
        <div
          className="absolute inset-0
                          after:content-[''] after:absolute after:w-[50px] after:h-[50px] after:rounded-full
                          after:border-l-[5px] after:border-l-[#00b6ff]
                          after:[animation:ro2_1.75s_linear_infinite]"
        ></div>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes ro1 {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes ro2 {
            0% { transform: skewX(60deg) rotate(0deg); }
            100% { transform: skewX(60deg) rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

function BattleNetLoaderFlat() {
  return (
    <div className="relative w-[80px] h-[40px]">
      <div className="absolute inset-0 [transform:rotate(165deg)]">
        <div
          className="absolute inset-0
                          after:content-[''] after:absolute after:w-[80px] after:h-[40px] after:rounded-full
                          after:border-l-[5px] after:border-l-[#00b6ff]
                          after:[animation:ro2_0.75s_linear_infinite]"
        ></div>
      </div>

      <div className="absolute inset-0 [transform:rotate(145deg)]">
        <div
          className="absolute inset-0
                          after:content-[''] after:absolute after:w-[80px] after:h-[40px] after:rounded-full
                          after:border-l-[5px] after:border-l-[#00b6ff]
                          after:[animation:ro2_0.75s_linear_infinite]"
        ></div>
      </div>

      <div className="absolute inset-0 [transform:rotate(155deg)]">
        <div
          className="absolute inset-0
                          after:content-[''] after:absolute after:w-[80px] after:h-[40px] after:rounded-full
                          after:border-l-[5px] after:border-l-[#00b6ff]
                          after:[animation:ro2_0.75s_linear_infinite]"
        ></div>
      </div>

      <div className="absolute inset-0 [transform:rotate(165deg)]">
        <div
          className="absolute inset-0
                          after:content-[''] after:absolute after:w-[80px] after:h-[40px] after:rounded-full
                          after:border-l-[5px] after:border-l-[#f6ff00]
                          after:[animation:ro3_0.75s_linear_infinite]"
        ></div>
      </div>

      <div className="absolute inset-0 [transform:rotate(145deg)]">
        <div
          className="absolute inset-0
                          after:content-[''] after:absolute after:w-[80px] after:h-[40px] after:rounded-full
                          after:border-l-[5px] after:border-l-[#f6ff00]
                          after:[animation:ro3_0.75s_linear_infinite]"
        ></div>
      </div>

      <div className="absolute inset-0 [transform:rotate(155deg)]">
        <div
          className="absolute inset-0
                          after:content-[''] after:absolute after:w-[80px] after:h-[40px] after:rounded-full
                          after:border-l-[5px] after:border-l-[#f6ff00]
                          after:[animation:ro3_0.75s_linear_infinite]"
        ></div>
      </div>

      <style>
        {`
          @keyframes ro1 {
            0%   { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes ro2 {
            0%   { transform: skewX(60deg) rotate(0deg); }
            100% { transform: skewX(60deg) rotate(360deg); }
          }
          @keyframes ro3 {
            0%   { transform: skewX(60deg) rotate(360deg); }
            100% { transform: skewX(60deg) rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
}

export default ExperimentsPage;
