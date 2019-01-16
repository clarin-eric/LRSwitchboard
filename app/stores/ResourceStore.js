// -------------------------------------------
// The CLARIN Language Resource Switchboard
// 2016-18 Claus Zinn, University of Tuebingen
// 
// File: ResourceStore.js
// Time-stamp: <2019-01-16 19:06:12 (zinn)>
// -------------------------------------------

import uuid from 'node-uuid';
import assign from 'object-assign';
import alt from '../libs/alt';
import ResourceActions from '../actions/ResourceActions';

class ResourceStore {
    constructor() {
	this.bindActions(ResourceActions);
	
	this.resources = [];

	this.exportPublicMethods({
	    get: this.get.bind(this),
	    getResource: this.getResource.bind(this)
	});
    }

    reset () {
	this.setState({
	    resources: []
	});
    }
	
    create(resource) {
	const resources = this.resources;
	
	resource.id = uuid.v4();
	resource.file             = resource.file || null;
	resource.remoteFilename   = resource.remoteFilename || null;
	resource.mimetype         = resource.mimetype || null;	
	resource.size             = resource.size || null;
	resource.language         = resource.language || null;
	
	this.setState({
	    resources: resources.concat(resource)
	});

	return resource;
    }
    
    update(updatedResource) {
	const resources = this.resources.map((resource) => {
	    if(resource.id === updatedResource.id) {
		return assign({}, resource, updatedResource);
	    }
	    
	    return resource;
	});

	this.setState({resources});
    }

    delete(id) {
	this.setState({
	    resources: this.resources.filter((resource) => resource.id !== id)
	});
    }

    getResource(resourceId) {
	let resource = this.resources.filter((resource) => resource.id == resourceId);
	return { resource: resource[0] };
    }

    get(ids) {
	return (ids || []).map(
	    (id) => this.resources.filter((resource) => resource.id === id)
	).filter((a) => a.length).map((a) => a[0]);
    }    
}

export default alt.createStore(ResourceStore, 'ResourceStore');
