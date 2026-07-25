'use client';

import { Button } from '../base-ui/button.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../base-ui/dropdown-menu.jsx';

const DropdownMenu5 = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-xl border-violet-300 text-xs font-bold text-violet-900 bg-violet-50 hover:bg-violet-100 flex items-center gap-2">
            <span>{selectedCategory || 'Select Domain'}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="bg-white w-72 rounded-xl border border-violet-100 p-1 shadow-lg z-50"
        >
          <DropdownMenuGroup>
            {categories && categories.map((cat) => (
              <DropdownMenuItem
                key={cat}
                onClick={() => setSelectedCategory && setSelectedCategory(cat)}
                className={`group flex cursor-pointer items-center justify-between rounded-lg p-2 text-xs font-semibold ${
                  selectedCategory === cat ? 'bg-violet-50 text-violet-900 font-extrabold' : 'text-gray-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-medium">{cat}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenu5;
