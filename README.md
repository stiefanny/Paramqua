# Paramqua

English-language water potability research demonstration with a light-blue and white interface.

## Model

Frozen SVM NoSMOTE, RBF kernel, threshold 0.5. Seven active measurements: pH, Hardness, Solids, Chloramines, Sulfate, Conductivity, and Trihalomethanes. Training-median imputation, derived features, scaling, and LIBSVM probability estimation run locally in the browser.

The JavaScript implementation matched Python predictions on 3,326 verification cases. Maximum absolute probability difference: 2.08e-14. This verifies implementation equivalence, not water-safety validity.

## Static deployment

Publish the repository root through a static host. No build, paid backend, API key, or running Colab session is required. A Render Blueprint is included; GitHub Pages can also serve the main branch root.

## Research limitations

Predictions follow the source dataset labels and are not certification of drinking-water safety or WHO compliance. Internal mean accuracy across nine outer folds: 67.67%; AUROC: 0.6874. Complete-measurement testing subset accuracy: 69.52%. These estimates do not guarantee accuracy on new samples.

Source dataset: https://www.kaggle.com/datasets/adityakadiwal/water-potability
