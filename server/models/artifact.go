package models

// Artifact :
type Artifact struct {
	Label string
	Link  string
}

func (a *Artifact) String() string {
	return ToStringViaJSONMarshal(a)
}
