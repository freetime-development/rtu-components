export const splitText = (text: React.ReactNode) => {
  if (typeof text !== 'string') {
    return text;
  }

  const replacedText = text.replace(/\\n/g, '\n');
  const parsedText = replacedText
    .split(/\n/)
    .map(splitText => (
      <div key={splitText}>{splitText ? splitText : <br />}</div>
    ));

  return parsedText;
};
