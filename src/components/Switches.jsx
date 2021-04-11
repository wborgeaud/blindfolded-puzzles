import React, { Component } from "react";

import Switch from "react-switch";

// export default class Switches extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     const {
//       toggleBoard,
//       togglePieces,
//       toggleSquares,
//       showBoard,
//       showPieces,
//       showSquares,
//     } = this.props;
//     return (
//       <div>
//         <label>
//           <span>Show board</span>
//           <Switch onChange={toggleBoard} checked={showBoard} />
//         </label>
//         {showBoard && (
//           <>
//             <label>
//               <span>Show squares</span>
//               <Switch onChange={toggleSquares} checked={showSquares} />
//             </label>
//             <label>
//               <span>Show pieces</span>
//               <Switch onChange={togglePieces} checked={showPieces} />
//             </label>
//           </>
//         )}
//       </div>
//     );
//   }
// }
export default function Switches({
  toggleBoard,
  togglePieces,
  toggleSquares,
  showBoard,
  showPieces,
  showSquares,
}) {
  return (
    <div>
      <div>
        <label>
          <span>Show board</span>
          <Switch onChange={toggleBoard} checked={showBoard} />
        </label>
      </div>
      <div>
        <label>
          <span>Show squares</span>
          <Switch
            onChange={toggleSquares}
            checked={showSquares}
            disabled={!showBoard}
          />
        </label>
      </div>
      <div>
        <label>
          <span>Show pieces</span>
          <Switch
            onChange={togglePieces}
            checked={showPieces}
            disabled={!showBoard}
          />
        </label>
      </div>
    </div>
  );
}
