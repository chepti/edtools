import { SerializedTool } from '@/lib/actions/tool.actions';
import Link from 'next/link';
import React from 'react';

// Updated props to use SerializedTool
type ToolCardProps = {
  tool: SerializedTool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="group relative flex min-h-[280px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[320px] dark:bg-gray-800">
      <Link
          href={`/tools/${tool._id}`}
          style={{backgroundImage: `url(${tool.logoUrl || '/logo-holmin.png'})`}}
          className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500 dark:bg-gray-700"
      />
      {/* TODO: Add logic for Admin actions (edit/delete) if needed */}

      <Link
        href={`/tools/${tool._id}`}
        className="flex min-h-[130px] flex-col gap-3 p-5 md:gap-4"
      >
         <div className="flex gap-2">
          {/* Placeholder for tags/categories */}
          {tool.tags?.slice(0, 2).map((tag) => (
             <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">
               #{tag}
            </span>
          ))}
          {/* Placeholder for Price/Free tag */}
           <p className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${tool.isFree ? 'bg-green-600' : 'bg-blue-600'}`}>
            {tool.isFree ? 'חינם' : 'בתשלום'}
           </p>
        </div>

        <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black dark:text-white">{tool.name}</p>

        <div className="flex-between w-full">
          {/* Placeholder for rating */}
          <p className="p-medium-14 md:p-medium-16 text-grey-600 dark:text-gray-400">
            ⭐ (דירוג יוסף בהמשך)
          </p>
          {/* Placeholder for author/contributor? */}
          {/* <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {tool.creator?.displayName || 'Unknown'}
          </p> */}
        </div>
      </Link>
    </div>
  );
}

export default ToolCard; 