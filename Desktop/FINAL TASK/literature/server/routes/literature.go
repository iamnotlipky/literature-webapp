package routes

import (
	"server/handlers"
	"server/pkg/middleware"
	"server/pkg/mysql"
	"server/repositories"

	"github.com/gorilla/mux"
)

func LiteratureRoutes(r *mux.Router) {
	literatureRepository := repositories.RepositoryLiterature(mysql.DB)
	h := handlers.HandlerLiterature(literatureRepository)

	r.HandleFunc("/literatures", h.FindLiteratures).Methods("GET")
	r.HandleFunc("/literature/{id}", middleware.Auth(h.GetLiterature)).Methods("GET")
	r.HandleFunc("/literature", middleware.Auth(middleware.UploadFile(h.CreateLiterature))).Methods("POST")
	r.HandleFunc("/literatureUser/{id}", h.GetLiteratureByUser).Methods("GET")
	r.HandleFunc("/literature/{id}", middleware.Auth(h.UpdateLiterature)).Methods("PATCH")
	r.HandleFunc("/literatures/approve", h.FindLiteraturesApprove).Methods("GET")

}
