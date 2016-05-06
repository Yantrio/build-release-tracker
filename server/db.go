package main

import (
	"encoding/binary"
	"encoding/json"
	"fmt"

	"github.com/boltdb/bolt"
	"github.com/yantrio/build-release-ui/server/models"
)

var buildBucket = []byte("build")

// StoreBuild saves a new build to the database
func StoreBuild(build *models.Build) int {
	var id uint64
	err := Application.DB.Update(func(tx *bolt.Tx) error {
		bucket, err := tx.CreateBucketIfNotExists(buildBucket)
		if err != nil {
			return err
		}

		id, _ = bucket.NextSequence()
		build.ID = int(id)

		value, err := json.Marshal(build)
		if err != nil {
			return err
		}

		err = bucket.Put(itob(build.ID), value)
		if err != nil {
			return err
		}
		return nil
	})
	Must(err)
	return int(id)
}

func DeleteBuild(id int) {
	err := Application.DB.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket(buildBucket)
		if bucket == nil {
			return fmt.Errorf("Bucket not found!")
		}
		e := bucket.Delete(itob(id))
		if e != nil {
			return e
		}
		return nil
	})
	Must(err)
}

// GetAllBuilds returns all builds currently in the database
func GetAllBuilds(DB *bolt.DB) []*models.Build {
	var builds []*models.Build
	e := DB.View(func(tx *bolt.Tx) error {
		bucket := tx.Bucket(buildBucket)
		if bucket == nil {
			return fmt.Errorf("Bucket not found!")
		}
		bucket.ForEach(func(k, v []byte) error {
			build := &models.Build{}
			json.Unmarshal(v, build)
			builds = append(builds, build)

			return nil
		})
		return nil
	})
	Must(e)
	return builds
}

// itob returns an 8-byte big endian representation of v.
func itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
}
