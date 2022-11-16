package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	literaturedto "server/dto/literature"
	dto "server/dto/result"
	"server/models"
	"server/repositories"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"

	"github.com/gorilla/mux"
)

type handlerLiterature struct {
	LiteratureRepository repositories.LiteratureRepository
}

var path_file = "http://localhost:5000/uploads/"

func HandlerLiterature(LiteratureRepository repositories.LiteratureRepository) *handlerLiterature {
	return &handlerLiterature{LiteratureRepository}
}

func (h *handlerLiterature) FindLiteratures(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	literatures, err := h.LiteratureRepository.FindLiteratures()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	for i, p := range literatures {
		literatures[i].File = path_file + p.File
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: literatures}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerLiterature) GetLiterature(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var literature models.Literature
	literature, err := h.LiteratureRepository.GetLiterature(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	literature.File = path_file + literature.File

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: convertResponseLiterature(literature)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerLiterature) CreateLiterature(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	dataContex := r.Context().Value("dataFile")
	filename := dataContex.(string)

	request := literaturedto.LiteratureRequest{
		Title:           r.FormValue("title"),
		PublicationDate: r.FormValue("publication_date"),
		Pages:           r.FormValue("pages"),
		ISBN:            r.FormValue("isbn"),
		Author:          r.FormValue("author"),
		Status:          "pending",
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	literature := models.Literature{
		Title:           request.Title,
		UserID:          userId,
		PublicationDate: request.PublicationDate,
		Pages:           request.Pages,
		ISBN:            request.ISBN,
		Author:          request.Author,
		Status:          request.Status,
		File:            filename,
	}

	literature, err = h.LiteratureRepository.CreateLiterature(literature)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	literature, _ = h.LiteratureRepository.GetLiterature(literature.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: literature}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerLiterature) GetLiteratureByUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var literature []models.Literature
	literature, err := h.LiteratureRepository.GetLiteratureByUser(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: literature}
	json.NewEncoder(w).Encode(response)
}

func convertResponseLiterature(u models.Literature) models.LiteratureResponse {
	return models.LiteratureResponse{
		ID:              u.ID,
		Title:           u.Title,
		PublicationDate: u.PublicationDate,
		Pages:           u.Pages,
		ISBN:            u.ISBN,
		Author:          u.Author,
		File:            u.File,
		Status:          u.Status,
		UserID:          u.UserID,
		User:            u.User,
	}
}

func (h *handlerLiterature) UpdateLiterature(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	request := literaturedto.UpdateLiteratureRequest{
		Status: r.FormValue("status"),
	}
	literature := models.Literature{}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	if request.Status != "" {
		literature.Status = request.Status
	}

	literature, err := h.LiteratureRepository.UpdateLiterature(literature, id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: literature}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerLiterature) FindLiteraturesApprove(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	literaturs, err := h.LiteratureRepository.FindLiteraturesApprove()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	for i, p := range literaturs {
		literaturs[i].File = os.Getenv("PATH_FILE") + p.File
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Message: http.StatusOK, Data: literaturs}
	json.NewEncoder(w).Encode(response)
}
