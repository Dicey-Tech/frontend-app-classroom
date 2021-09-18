const { createConfig } = require('@edx/frontend-build');

module.exports = createConfig('eslint', {
    "rules":
    {
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
        'react/prop-types': 'off'
    }

});


