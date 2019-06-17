import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input:'src/main.js',
    plugins:[
        resolve(),
        babel({
            exclude:'node_modules/**'
        })
    ],
    output: {
        file: 'bundle.js',
        format: 'umd'
    }
}