let path = require('path'),
    child_process = require('child_process');

function build() {
    let args = [
        require.resolve(path.join('node-gyp', 'bin', 'node-gyp.js')),
        'rebuild', '--debug'
    ];
    console.log('Building:', [process.execPath].concat(args).join(' '));
    let env = Object.keys(process.env).reduce((fixedEnv, key) => {
        fixedEnv[key.toUpperCase()] = process.env[key];
        return fixedEnv;
    }, {});
    let proc = child_process.spawn(process.execPath, args, {
        stdio: [0, 1, 2],
        env: env
    });

    proc.on('exit', function(errorCode) {
        if (!errorCode) return;

        if (errorCode === 127 ) {
            console.error('node-gyp not found!');
        } else {
            console.error('Build failed with error code:', errorCode);
        }

        process.exit(1);
    });
}

build();