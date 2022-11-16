package routes

import (
	"server/handlers"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func CollectionRoutes(r *mux.Router) {
	collectionRepository := repositories.RepositoryCollection(mysql.DB)
	h := handlers.HandlerCollection(collectionRepository)

	r.HandleFunc("/collections", h.FindCollection).Methods("GET")
	r.HandleFunc("/collection", h.CreateCollection).Methods("POST")
	r.HandleFunc("/collection/{id}", h.GetCollection).Methods("GET")
	r.HandleFunc("/collectionUser/{id}", h.GetCollectionByUser).Methods("GET")
	r.HandleFunc("/collectionLiterature/{id}", h.GetCollectionByLiterature).Methods("GET")
	r.HandleFunc("/collection/{id}", h.DeleteCollection).Methods("DELETE")
}
