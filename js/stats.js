const {createApp} = Vue;

const stats = createApp({
	data() {
		return {
			resultadoMenorPorcentajeAsis: '',
			resultadoMayorPorcentajeAsis: '',
			resultadoMayorCapacidad: '',
			eventosUpcoming: undefined,
			eventosPast: undefined,
			eventosPastTabla3: undefined,
			categorias: {},
			categorias2: {},
		};
	},
	created() {
		fetch('https://mindhub-xj03.onrender.com/api/amazing')
			.then(response => response.json())
			.then(datosEvent => {
				this.eventosPast = datosEvent.events.filter(event => event.date < datosEvent.currentDate);
				this.eventosPastTabla3 = datosEvent.events.filter(event => event.date < datosEvent.currentDate);
				this.eventosUpcoming = datosEvent.events.filter(event => event.date > datosEvent.currentDate);
				this.resultadoMayorPorcentajeAsis = this.eventosPast
					.sort((evento1, evento2) => {
						return (evento1.assistance / evento1.capacity) * 100 - (evento2.assistance / evento2.capacity) * 100;
					})
					.slice(-1)[0];
				this.resultadoMenorPorcentajeAsis = this.eventosPast
					.sort((evento1, evento2) => {
						return (evento1.assistance / evento1.capacity) * 100 - (evento2.assistance / evento2.capacity) * 100;
					})
					.slice(0, 1)[0];
				this.resultadoMayorCapacidad = datosEvent.events.sort((evento1, evento2) => evento1.capacity - evento2.capacity).slice(-2)[0];

				//------------------------------------tabla2--------------------------------------------------------//

				this.eventosUpcoming.forEach(propiedadEventos => {
					if (!this.categorias[propiedadEventos.category]) {
						this.categorias[propiedadEventos.category] = {
							price: 0,
							estimate: 0,
							capacity: 0,
						};
					}
					this.categorias[propiedadEventos.category].price += propiedadEventos.price * propiedadEventos.estimate;
					this.categorias[propiedadEventos.category].capacity += propiedadEventos.capacity;
					this.categorias[propiedadEventos.category].estimate += propiedadEventos.estimate;
				});

				//------------------------------------tabla3---------------------------------------------------------//

				this.eventosPastTabla3.forEach(propiedadEventos => {
					if (!this.categorias2[propiedadEventos.category]) {
						this.categorias2[propiedadEventos.category] = {
							price: 0,
							assistance: 0,
							capacity: 0,
						};
					}
					this.categorias2[propiedadEventos.category].price += propiedadEventos.price * propiedadEventos.assistance;
					this.categorias2[propiedadEventos.category].capacity += propiedadEventos.capacity;
					this.categorias2[propiedadEventos.category].assistance += propiedadEventos.assistance;
				});
			})
			.catch(error => console.log(error));
	},
});

stats.mount('#mainVue');
