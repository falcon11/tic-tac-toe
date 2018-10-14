import React from 'react';

// export default class Square extends Component {
//     render() {
//         const { value } = this.props;
//         return (
//             <button
//                 className={'square'}
//                 onClick={this.props.onClick}
//             >
//                 {value}
//             </button>
//         )
//     }
// }


// 性能优化： https://reactjs.org/docs/optimizing-performance.html#examples
/**
 * In React, function components are a simpler way to write components that only contain a render method and don’t have their own state. Instead of defining a class which extends React.Component, we can write a function that takes props as input and returns what should be rendered. Function components are less tedious to write than classes, and many components can be expressed this way.
*/

export default function Square(props) {
    return (
        <button
            className='square'
            onClick={props.onClick}
        >
            {props.value}
        </button>
    )
}