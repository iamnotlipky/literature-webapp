package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	FullName string `json:"fullName" form:"fullName" validate:"required"`
	Email    string `json:"-" form:"email" validate:"required"`
	Password string `json:"-" form:"password" validate:"required"`
}
