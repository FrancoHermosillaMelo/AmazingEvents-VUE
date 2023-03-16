const {createApp} = Vue;

const index = createApp({
	data() {
		return {
			params: '',
			idContent: '',
			id: '',
			change: '',
		};
	},
	created() {
		fetch('https://mindhub-xj03.onrender.com/api/amazing')
			.then(response => response.json())
			.then(datosEvent => {
				this.params = new URLSearchParams(location.search);
				this.id = this.params.get('id');
				this.idContent = datosEvent.events.find(event => event._id == this.id);
				this.change = this.idContent.estimate ? 'estimate' : 'assistance';
			})
			.catch(error => console.log(error));
	},
});

index.mount('#mainVue');
