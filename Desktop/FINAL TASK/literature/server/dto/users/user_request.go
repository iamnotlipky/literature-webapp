package usersdto

type CreateUserRequest struct {
	FullName string `json:"fullName" form:"fullName" validate:"required"`
	Email    string `json:"-" form:"email" validate:"required"`
	Password string `json:"-" form:"password" validate:"required"`
}

type UpdateUserRequest struct {
	Image string `json:"image" form:"image"`
}
