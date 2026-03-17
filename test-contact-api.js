// Simple test script to verify contact API is working
const http = require('http');

const testEndpoints = [
  {
    method: 'GET',
    path: '/api/contacts',
    description: 'Get all contacts (admin)'
  },
  {
    method: 'GET',
    path: '/api/contacts/user/test-user-id',
    description: 'Get user contacts'
  }
];

function testEndpoint(method, path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          data: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Contact API Endpoints...\n');
  
  for (const endpoint of testEndpoints) {
    try {
      console.log(`Testing: ${endpoint.description}`);
      console.log(`${endpoint.method} ${endpoint.path}`);
      
      const result = await testEndpoint(endpoint.method, endpoint.path);
      
      if (result.status === 200 || result.status === 404) {
        console.log(`✅ Status: ${result.status}`);
        console.log(`Response: ${result.data.substring(0, 100)}...\n`);
      } else {
        console.log(`❌ Status: ${result.status}`);
        console.log(`Response: ${result.data}\n`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}\n`);
    }
  }
  
  console.log('✅ Test complete!');
  process.exit(0);
}

// Wait a moment for server to be ready
setTimeout(runTests, 1000);
