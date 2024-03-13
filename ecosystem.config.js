module.exports = {
    apps: [
      {
        name: 'EmonCMSFrontEnd',
        script: 'node_modules/next/dist/bin/next', // Path to Next.js binary
        args: 'start', // Command-line arguments to pass to Next.js
        instances: 'max', // Run as many instances as possible
        autorestart: true, // Automatically restart the application if it crashes
        watch: false, // Disable file watching to restart the application
        max_memory_restart: '1G', // Maximum memory usage to automatically restart
        env: {
          NODE_ENV: 'production', // Set environment to production
          PORT: 3000 // Set port for the application
        }
      }
    ]
  };
  