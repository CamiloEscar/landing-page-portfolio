/* eslint-disable no-unused-vars */
import React from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  toc: TocItem[];
  activeHeading: string | null;
  scrollToHeading: (id: string) => void;
  isFloating?: boolean;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  toc,
  activeHeading,
  scrollToHeading,
  isFloating = false,
}) => {
  const handleItemClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToHeading(id);
  };

  return (
    <div className={`toc ${isFloating ? 'floating-toc' : ''}`}>
      <h3 className="font-semibold mb-2 text-lg">Contenido</h3>
      <ul className="space-y-2">
        {toc.map((item) => (
          <li
            key={item.id}
            style={{ marginLeft: `${(item.level - 2) * 1}rem` }}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleItemClick(e, item.id)}
              className={`block py-1 px-2 rounded transition-colors duration-200 ${
                activeHeading === item.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;