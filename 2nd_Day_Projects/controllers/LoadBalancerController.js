class LoadBalancerController {
    constructor() {
        this.servers = [];
        this.currentIndex = 0; // Round robin index
    }

    routeServer() {
        const currentServer = this.servers[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.servers.length;
        return currentServer;
    }
}

module.exports = LoadBalancerController;
