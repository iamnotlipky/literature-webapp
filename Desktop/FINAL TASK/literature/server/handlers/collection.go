package handlers

import (
	"encoding/json"
	"net/http"
	collectiondto "server/dto/collection"
	dto "server/dto/result"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/gorilla/mux"
)

type handlerCollection struct {
	CollectionRepository repositories.CollectionRepository
}

func HandlerCollection(CollectionRepository repositories.CollectionRepository) *handlerCollection {
	return &handlerCollection{CollectionRepository}
}

func (h *handlerCollection) CreateCollection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var request collectiondto.CollectionRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	collection := models.Collection{
		UserID:       request.UserID,
		LiteratureID: request.LiteratureID,
	}

	data, err := h.CollectionRepository.CreateCollection(collection)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	collection, _ = h.CollectionRepository.GetCollection(data.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: convertResponseCollection(collection)}
	json.NewEncoder(w).Encode(response)
}

func convertResponseCollection(u models.Collection) models.Collection {
	return models.Collection{
		ID:           u.ID,
		UserID:       u.UserID,
		User:         u.User,
		LiteratureID: u.LiteratureID,
		Literature:   u.Literature,
	}
}

func (h *handlerCollection) FindCollection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	collections, err := h.CollectionRepository.FindCollection()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: collections}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerCollection) GetCollection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var collection models.Collection

	collection, err := h.CollectionRepository.GetCollection(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: collection}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerCollection) DeleteCollection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	collection, err := h.CollectionRepository.GetCollection(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.CollectionRepository.DeleteCollection(collection)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerCollection) GetCollectionByLiterature(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

		id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var collection []models.Collection
	collection, err := h.CollectionRepository.GetCollectionByLiterature(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: collection}
	json.NewEncoder(w).Encode(response)
}
func (h *handlerCollection) GetCollectionByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var collection []models.Collection
	collection, err := h.CollectionRepository.GetCollectionByUser(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: collection}
	json.NewEncoder(w).Encode(response)
}
