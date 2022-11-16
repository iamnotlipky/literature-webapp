package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	UserRoutes(r)
	LiteratureRoutes(r)
	AuthRoutes(r)
	CollectionRoutes(r)
}
