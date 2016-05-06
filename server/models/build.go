package models

import "time"

// Build :
type Build struct {
	ID          int
	Label       string
	ReleaseDate time.Time
	Artifacts   []Artifact
	DockerTag   string
}

func (b *Build) String() string {
	return ToStringViaJSONMarshal(b)
}
