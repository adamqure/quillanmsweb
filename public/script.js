var app = new Vue({
	el: '#app',
	data: {
		addedName: '',
		addedRequestName: '',
		addedRequestDescription: '',
		addedCompensation: '',
		requests: {},
	},
	created() {
		this.getRequests();
	},
	methods: {
		async getRequests() {
			try {
				let response = await axios.get("http://localhost:3000/api/requests");
				this.requests = response.data;
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async addRequest() {
			try {
				let response = await axios.post("http://localhost:3000/api/requests", {
					name: this.addedName,
					projectname: this.addedRequestName,
					projectdescription: this.addedRequestDescription,
					compensation: this.addedCompensation
				});
				this.addedName = "";
				this.addedRequestName = "";
				this.addedRequestDescription = "";
				this.addedCompensation = "";
				this.getRequests();
				return true;
			} catch (error) {
				console.log(error);
			}
		},
		async deleteRequest(request) {
			try {
				let response = axios.delete("http://localhost:3000/api/requests/" + request.id);
				this.getRequests();
				return true;
			} catch (error) {
				console.log(error);
			}
		}
	}
});