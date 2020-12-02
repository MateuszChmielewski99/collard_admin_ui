import config from 'react-global-configuration';

class ServiceDiscovery {
  getServiceUrl(): ServiceDiscoveryResult {
    return {
      ApiGatewayUrl: config.get('agUrl'),
    };
  }
}

type ServiceDiscoveryResult = {
  ApiGatewayUrl: string;
};

export default new ServiceDiscovery();
