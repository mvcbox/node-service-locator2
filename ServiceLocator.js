'use strict';

class ServiceLocator {
    /**
     *
     */
    constructor() {
        this._dependencies = {};
        this._locators = {};
    }

    /**
     * @param {string} name
     * @returns {ServiceLocator}
     */
    internal(name) {
        if (!this._locators[name]) {
            this._locators[name] = new this.constructor;
        }

        return this._locators[name];
    }

    /**
     * @param {string} name
     * @returns {*}
     */
    get(name) {
        if (!this.exists(name)) {
            throw new Error(`Dependency "${name}" not found`);
        }

        return this._dependencies[name]();
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    exists(name) {
        return !!this._dependencies[name];
    }

    /**
     * @param {string} name
     * @returns {ServiceLocator}
     */
    remove(name) {
        if (!this.exists(name)) {
            throw new Error(`Dependency "${name}" not found`);
        }

        delete this._dependencies[name];
        return this;
    }

    /**
     * @param {string} name
     * @param {*} service
     * @returns {ServiceLocator}
     */
    register(name, service) {
        return this.registerFactory(name, function () {
            return service;
        });
    }

    /**
     * @param {string} name
     * @param {function} factory
     * @returns {ServiceLocator}
     */
    registerFactory(name, factory) {
        if (this.exists(name)) {
            throw new Error(`Dependency "${name}" already exists`);
        }

        this._dependencies[name] = factory;
        return this;
    }
}

module.exports = ServiceLocator;
