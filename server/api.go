package main

import (
	"strconv"
	"time"

	"github.com/yantrio/build-release-ui/server/models"

	"gopkg.in/labstack/echo.v1"
)

// API is a defined as struct bundle
// for api. Feel free to organize
// your app as you wish.
type API struct{}

// Bind attaches api routes
func (api *API) Bind(group *echo.Group) {
	group.Get("/v1/conf", api.ConfHandler)
	group.Get("/v1/builds", api.GetBuilds)
	group.Post("/v1/builds", api.SaveBuild)
	group.Delete("/v1/builds/:id", api.DeleteBuild)
}

// ConfHandler handle the app config, for example
func (api *API) ConfHandler(c *echo.Context) error {
	app := c.Get("app").(*App)
	<-time.After(time.Millisecond * 500)
	c.JSON(200, app.Conf.Root)
	return nil
}

// GetBuilds returns all the builds in the system
func (api *API) GetBuilds(c *echo.Context) error {
	app := c.Get("app").(*App)
	builds := GetAllBuilds(app.DB)
	c.JSON(200, builds)
	return nil
}

// DeleteBuild deletes a build in the system
func (api *API) DeleteBuild(c *echo.Context) error {
	id := c.Param("id")
	intid, err := strconv.Atoi(id)
	Must(err)
	DeleteBuild(intid)
	c.JSON(200, "")
	return nil
}

// SaveBuild saves a build to the system
func (api *API) SaveBuild(c *echo.Context) error {
	var build models.Build
	c.Bind(&build)
	id := StoreBuild(&build)
	c.JSON(202, id)
	return nil
}
