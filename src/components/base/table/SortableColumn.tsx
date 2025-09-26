// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
// import { useRouter } from 'next/navigation';
// import { FC, PropsWithChildren } from 'react';
// import { TableHead } from './Table';
// import { cn } from '@/lib/utils';
// import { useInfiniteCount } from '@/hooks/useInfiniteCount';

// type Props = {
//   column: string;
// } & PropsWithChildren;

// const SORTING_DIRECTION_VALUES = ['', 'asc', 'desc'];
// const SORTING_KEY = 'sort';

// type CurrentSorting = {
//   dir: string;
//   index: number | null;
// };

// // Returns the direction of currently sorted column and its index in a sort arrray
// function getCurrentSorting(column: string, sort: string[]) {
//   return sort.reduce<CurrentSorting>(
//     (acc, value, i) => {
//       const [col, dir] = value.split(',');

//       if (col && dir) {
//         return col === column ? { dir, index: i } : acc;
//       }

//       return acc;
//     },
//     { dir: SORTING_DIRECTION_VALUES[0]!, index: null },
//   );
// }

// export const SortableColumn: FC<Props> = ({ column, children }) => {
//   const { push } = useRouter();

//   const { search, origin, pathname } = window.location;
//   const searchParams = new URLSearchParams(search);
//   const sort = searchParams.getAll(SORTING_KEY);
//   const { dir, index } = getCurrentSorting(column, sort);
//   const currentSortingDirectionIndex = dir
//     ? SORTING_DIRECTION_VALUES.indexOf(dir)
//     : 0;
//   const { next } = useInfiniteCount(
//     currentSortingDirectionIndex,
//     SORTING_DIRECTION_VALUES.length,
//   );
//   const nextSortingDirection = SORTING_DIRECTION_VALUES[next];

//   const handleClick = () => {
//     if (!nextSortingDirection && index !== null) {
//       // This column is to be unsorted, if it's the only column, remove the whole sort param
//       // otherwise, remove just this column
//       searchParams.delete(SORTING_KEY, sort[index]);
//     } else {
//       const newValue = `${column},${nextSortingDirection}`;

//       if (index !== null) {
//         // column is already sorted, just change its value
//         sort[index] = newValue;
//       } else {
//         // this is a new column, add it to the sort array
//         sort.push(newValue);
//       }

//       const [head, ...tail] = sort;
//       searchParams.set(SORTING_KEY, head);
//       tail.forEach(val => searchParams.append(SORTING_KEY, val));
//     }

//     if (searchParams.size) {
//       push(`${origin}${pathname}?${searchParams.toString()}`);
//     } else {
//       push(`${origin}${pathname}`);
//     }
//   };

//   return (
//     <TableHead onClick={handleClick} className="cursor-pointer">
//       <div className="flex select-none items-center gap-2">
//         {children}
//         <div className="w-5">
//           {dir === 'asc' && <ChevronUpIcon className={cn('h-5')} />}
//           {dir === 'desc' && <ChevronDownIcon className={cn('h-5')} />}
//         </div>
//       </div>
//     </TableHead>
//   );
// };
