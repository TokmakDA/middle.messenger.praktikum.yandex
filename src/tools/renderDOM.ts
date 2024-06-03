import Block from './Block';

export default function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query) as HTMLElement;

  root.append(block.getContent() as Node);

  return root;
}
