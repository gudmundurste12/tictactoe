Notes about the pipeline
=========

The pipeline for this project has 3 stages: Commit, acceptance and production. The commit and production stages work as intended, but the acceptance stage doesn't work because I couldn't get the acceptance tests to run on the droplet. Googling the problem didn't help at all but the acceptance tests work fine when I run them locally. Therefore, in order to have a working pipeline, I have disabled the acceptance stage.

The only thing the acceptance stage did was execute the e2eTest.sh script. 