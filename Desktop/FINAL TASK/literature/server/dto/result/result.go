package dto

type SuccessResult struct {
	Message int         `json:"message"`
	Data    interface{} `json:"data"`
}

type ErrorResult struct {
	Code    int    `json:"code"`
	Message string `json:"message"`
}
