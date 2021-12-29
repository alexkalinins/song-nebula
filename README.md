# SongNebula

A music-lover's tool for visually finding similar songs.

## About the project

SongNebula is a tool that allows the exploration of songs based on audio features. You can select three different features to explore
and the songs will placed in the &lsquo;Nebula&lsquo; based on their features; essentially a 3D scatterplot. A Gaussian Mixture Model
has been fitted on all of the songs, placing each song in a particular &lsquo;Cluster&lsquo; based on the features of the song. The
songs in each cluster can be from very different genres but still share some pattern of features. The color of each song&lsquo;s point in
the nebula is determined by its cluster.

You can explore the sound of each cluster using the &lsquo;Cluster Radio&lsquo;. Spotify playlists based on each cluster are comming soon :)

This project was created by [Alex Kalinins](https://github.com/alexkalinins) with some help from [Parssa Kyanzadeh](https://github.com/parssak). Thanks for checking it out!


## Implementation

Data used to make SongNebula comes from the Spotify Web API. When a song is looked up, its audio features are saved to the database and its
cluster is predicted using the Gaussian Mixture Model (GMM). The GMM was trained in Python using SciKit-Learn. The model parameters were saved
and used in the express.js backend to predict the cluster when a new song is added.


The front was implemented in Next.js and Three.js. All points in the SongNebula graph use the InstanceMesh, greatly improving the performance
of the webapp. The [back-end](https://github.com/alexkalinins/song-nebula-backend) was implemented in TypeScript using express.
