import Bishop from "../components/Figures/Bishop/Bishop";
import King from "../components/Figures/King/King";
import Knight from "../components/Figures/Knight/Knight";
import Queen from "../components/Figures/Queen/Queen";
import Rook from "../components/Figures/Rook/Rook";

const elementsPerLine = 8;

export interface FieldDataItem {
  figure: Rook | Knight | Bishop | King | Queen | null,
  id?: number | null
}

const defaultFieldState: FieldDataItem[][] = [
  [
    {
      figure: new Rook({ color: 'black' }),
    },
    {
      figure: new Knight({ color: 'black' }),
    },
    {
      figure: new Bishop({ color: 'black' }),
    },
    {
      figure: new King({ color: 'black' }),
    },
    {
      figure: new Queen({ color: 'black' }),
    },
    {
      figure: new Bishop({ color: 'black' }),
    },
    {
      figure: new Knight({ color: 'black' }),
    },
    {
      figure: new Rook({ color: 'black' }),
    },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [
    {
      figure: new Rook({ color: 'white' }),
    },
    {
      figure: new Knight({ color: 'white' }),
    },
    {
      figure: new Bishop({ color: 'white' }),
    },
    {
      figure: new King({ color: 'white' }),
    },
    {
      figure: new Queen({ color: 'white' }),
    },
    {
      figure: new Bishop({ color: 'white' }),
    },
    {
      figure: new Knight({ color: 'white' }),
    },
    {
      figure: new Rook({ color: 'white' }),
    },
  ]
];

const emptyStringsStart = 1;
const emptyStringsEnd = 7;
for (let i = emptyStringsStart; i < emptyStringsEnd; i += 1) {
  for (let j = 0; j < elementsPerLine; j += 1) {
    if (!defaultFieldState[i][j]) {
      defaultFieldState[i][j] = {
        figure: null,
      }
    }
  }
}

defaultFieldState.flat().forEach((e, index) => {
  e.id = index;
});

export default defaultFieldState;