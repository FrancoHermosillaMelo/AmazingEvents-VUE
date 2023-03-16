const {createApp} = Vue;

const index = createApp({
	data() {
		return {
			eventos: {},
			busqueda: '',
			categorias: undefined,
			check: [],
			eventosFiltrados: {},
		};
	},
	created() {
		fetch('https://mindhub-xj03.onrender.com/api/amazing')
			.then(response => response.json())
			.then(datosEvent => {
				this.eventos = datosEvent.events.filter(event => event.date > datosEvent.currentDate);
				this.eventosFiltrados = this.eventos;
				this.categorias = Array.from(new Set(datosEvent.events.map(evento => evento.category)));
			})
			.catch(error => console.log(error));
	},
	methods: {
		filtroCruzados() {
			this.eventosFiltrados = this.eventos.filter(evento => {
				return evento.name.toLowerCase().includes(this.busqueda.toLowerCase()) && (this.check.includes(evento.category) || this.check == 0);
			});
		},
	},
});

index.mount('#mainVue');
